/* eslint-disable @typescript-eslint/camelcase */
import { delays, resource } from 'serve-mock/utils';
import dayjs from 'dayjs';

interface Store {
  name: string;
  level: number;
  avatar: string;
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const level: IUserLevel = { id: 1, name: 'VIP1' };
const users: IUser[] = [
  { id: 1, name: '彭夏', avatar: 'https://img.xiaopiu.com/userImages/img9159694579f0.jpeg', sex: 2, level, phone: '13776721117', balance: '2.36', points: '1988.21', created_at: '2019-11-16 23:02:21', updated_at: '2019-11-16 23:02:21' },
  { id: 2, name: '刘杰', avatar: 'https://img.xiaopiu.com/userImages/img7159694579f0.jpeg', sex: 1, level, phone: '18708514103', balance: '2.36', points: '1988.21', created_at: '2019-11-16 23:02:21', updated_at: '2019-11-16 23:02:21' },
  { id: 3, name: '张冬', avatar: 'https://img.xiaopiu.com/userImages/img12159694579f0.jpg', sex: 2, level, phone: '13352593970', balance: '28.32', points: '54.30', created_at: '2019-11-16 23:02:21', updated_at: '2019-11-16 23:02:21' },
  { id: 4, name: '郑雪', avatar: 'https://img.xiaopiu.com/userImages/img10159694579f0.jpeg', sex: 2, level, phone: '18708514103', balance: '33.52', points: '74.12', created_at: '2019-11-16 23:02:21', updated_at: '2019-11-16 23:02:21' },
  { id: 5, name: '崔冬', avatar: 'https://img.xiaopiu.com/userImages/img7156799f8280.png', sex: 2, level, phone: '13530435556', balance: '99.00', points: '3324.00', created_at: '2019-11-16 23:02:21', updated_at: '2019-11-16 23:02:21' },
  { id: 6, name: '王怡', avatar: 'https://img.xiaopiu.com/userImages/img8159694579f0.jpeg', sex: 2, level, phone: '18903880356', balance: '232.36', points: '0.00', created_at: '2019-11-16 23:02:21', updated_at: '2019-11-16 23:02:21' },
];


function validator(data: Store) {
  const { level = 1 } = data;
  const at = dayjs().format('YYYY-MM-DD HH:mm:ss');

  return {
    sex: rand(1, 2),
    created_at: at,
    updated_at: at,
    ...data,
    level: { id: level, name: `VIP${level}` },
  };
}

export default delays(resource('/v1/users', users, { validator }), 100, 1500);
