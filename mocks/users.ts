import { delays, resource } from 'serve-mock/utils';

const avatar = [
  'https://img.xiaopiu.com/userImages/img9159694579f0.jpeg',
  'https://img.xiaopiu.com/userImages/img7159694579f0.jpeg',
  'https://img.xiaopiu.com/userImages/img12159694579f0.jpg',
  'https://img.xiaopiu.com/userImages/img10159694579f0.jpeg',
  'https://img.xiaopiu.com/userImages/img7156799f8280.png',
  'https://img.xiaopiu.com/userImages/img8159694579f0.jpeg',
];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function validator(data: any) {
  const date = new Date();
  const at = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  const { level = 1 } = data;

  return {
    avatar: avatar[rand(0, avatar.length - 1)],
    sex: rand(1, 2),
    created_at: at,
    updated_at: at,
    ...data,
    level: { id: level, name: `VIP${level}` },
  }
}

export default delays(resource('/v1/users', [
  { id: 1, name: '彭夏', avatar: 'https://img.xiaopiu.com/userImages/img9159694579f0.jpeg', sex: 2, level: { id: 1, name: 'VIP1' }, phone: '13776721117', balance: '2.36', points: '1988.21', created_at: '2019-11-16 23:02:21', updated_at: '2019-11-16 23:02:21' },
  { id: 2, name: '刘杰', avatar: 'https://img.xiaopiu.com/userImages/img7159694579f0.jpeg', sex: 1, level: { id: 1, name: 'VIP1' }, phone: '18708514103', balance: '2.36', points: '1988.21', created_at: '2019-11-16 23:02:21', updated_at: '2019-11-16 23:02:21' },
  { id: 3, name: '张冬', avatar: 'https://img.xiaopiu.com/userImages/img12159694579f0.jpg', sex: 2, level: { id: 1, name: 'VIP1' }, phone: '13352593970', balance: '28.32', points: '54.30', created_at: '2019-11-16 23:02:21', updated_at: '2019-11-16 23:02:21' },
  { id: 4, name: '郑雪', avatar: 'https://img.xiaopiu.com/userImages/img10159694579f0.jpeg', sex: 2, level: { id: 1, name: 'VIP1' }, phone: '18708514103', balance: '33.52', points: '74.12', created_at: '2019-11-16 23:02:21', updated_at: '2019-11-16 23:02:21' },
  { id: 5, name: '崔冬', avatar: 'https://img.xiaopiu.com/userImages/img7156799f8280.png', sex: 2, level: { id: 1, name: 'VIP1' }, phone: '13530435556', balance: '99.00', points: '3324.00', created_at: '2019-11-16 23:02:21', updated_at: '2019-11-16 23:02:21' },
  { id: 6, name: '王怡', avatar: 'https://img.xiaopiu.com/userImages/img8159694579f0.jpeg', sex: 2, level: { id: 1, name: 'VIP1' }, phone: '18903880356', balance: '232.36', points: '0.00', created_at: '2019-11-16 23:02:21', updated_at: '2019-11-16 23:02:21' },  
], { validator }), 100, 1500);
