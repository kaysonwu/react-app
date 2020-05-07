import { lowerFirst, upperFirst, upperWords, studly, camel } from '@/utils/string';

describe('Test locale util', () => {
  test('test lowerFirst', () => {
    expect(lowerFirst('Words')).toEqual('words');
  });

  test('test upperFirst', () => {
    expect(upperFirst('words')).toEqual('Words');
  });

  test('test upperWords', () => {
    expect(upperWords('hello world')).toEqual('Hello World');
    expect(upperWords('HELLO WORLD')).toEqual('HELLO WORLD');
    expect(upperWords('hello  world')).toEqual('Hello  World');
    expect(upperWords("i'm a baby")).toEqual("I'm A Baby");
  });

  test('test studly', () => {
    expect(studly('user_name')).toEqual('UserName');
    expect(studly('created-at')).toEqual('CreatedAt');
  });

  test('test camel', () => {
    expect(camel('user_name')).toEqual('userName');
    expect(camel('created-at')).toEqual('createdAt');
    expect(camel('updated at')).toEqual('updatedAt');
  });
});
