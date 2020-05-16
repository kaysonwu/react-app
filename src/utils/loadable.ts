// #if NODE_SERVER
import { join } from 'path';
import { existsSync } from 'fs';

export function loadModel(names: string[], path: string) {
  const models: IModel[] = [];

  for (let name of names) {
    try {
      let filename = join(path, `${name}.js`);
      let model = require(filename).default as IModel;
      models.push(model);
      if (model.dependencies) {
        models.push(...loadModel(model.dependencies, path));
      }
    } catch {}
  }

  return models.filter((model, i) => !models.splice(i + 1).some(m => m.id === model.id));
}

export function hasLocaleFile(name: string, path: string = join(__dirname, 'locales')) {
  return existsSync(join(path, `${name}.js`));
}
// #endif

// #if WEB
export function onLoadError(error: Error) {}
// #endif

export function getNameFromPath(path: string) {
  if (!path || path === '/') {
    return 'home';
  }
  
  // TODO 复数转单数，目前是仅去除结尾的 s
  return path.replace(/^\/|s$/g, '')
    .replace(/\/\d+\//, '/')   // a/:id/b => a/b
    .replace(/\//g, '-'); // a/b => a-b
}
