import { camel, kebab, lowerFirst, snake, studly, upperFirst, upperWords } from '@/utils/string';

describe('Test locale util', () => {
  test('lowerFirst', () => {
    expect(lowerFirst('Words')).toEqual('words');
  });

  test('upperFirst', () => {
    expect(upperFirst('words')).toEqual('Words');
  });

  test('upperWords', () => {
    expect(upperWords('hello world')).toEqual('Hello World');
    expect(upperWords('HELLO WORLD')).toEqual('HELLO WORLD');
    expect(upperWords('hello  world')).toEqual('Hello  World');
    expect(upperWords("i'm a baby")).toEqual("I'm A Baby");
  });

  test('studly', () => {
    expect(studly('user_name')).toEqual('UserName');
    expect(studly('created-at')).toEqual('CreatedAt');
    expect(studly(['level', 'name'])).toEqual('LevelName');
  });

  test('camel', () => {
    expect(camel('user_name')).toEqual('userName');
    expect(camel('created-at')).toEqual('createdAt');
    expect(camel('updated at')).toEqual('updatedAt');
  });

  test('snake', () => {
    expect(snake('User Name')).toEqual('user_name');
    expect(snake('User Name', '__')).toEqual('user__name');
    expect(snake('userName')).toEqual('user_name');
  });

  test('kebab', () => {
    expect(kebab('User Name')).toEqual('user-name');
  });
});
