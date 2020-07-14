import { IncomingMessage } from 'http';
import { resolve, join } from 'path';
import { promises } from 'fs';
import { IMock } from 'serve-mock';
// @ts-ignore
import formidable from 'formidable';

type Fields = Record<string, string | string[]>;

interface File {
  size: number;
  path: string;
  name: string | null;
  type: string | null;
  lastModifiedDate: Date | null;
  hash: string | 'sha1' | 'md5' | 'sha256' | null;
}
const root = resolve(__dirname, '..', 'public');
const options = { multiples: true, keepExtensions: true, uploadDir: join(root, 'uploads') };

promises.mkdir(options.uploadDir).catch(() => { /* do nothing */ });

function url(req: IncomingMessage, path: string) {
  return path.replace(root, `http://${req.headers.host!}`);
}

const mock: IMock = {
  'POST /v1/uploads': (req, res) => {
    const form = formidable(options);
    form.parse(req, (error: unknown, fields: Fields, files: Record<string, File>) => {
      const names = Object.keys(files);
      const maxSize = 1 * 1024 * 1024;
      const name = names.find(name => files[name].size > maxSize);

      if (name) {
        res.statusCode = 422;
        res.end(`${name} must smaller than 1MB`);
      } else if (names.length === 1) {
        res.end(url(req, files[names[0]].path));
      } else {
        const data = names.map(name => ({ [name]: url(req, files[name].path) }));
        res.writeHead(201, { 'content-type': 'application/json' });
        res.end(JSON.stringify(data));
      }
    });
  },
};

export default mock;
