import { normalizeMessage, convertEntityErrorToFieldData } from '@/utils/request';

describe('Test request util', () => {
  test('normalizeMessage', () => {
    expect(normalizeMessage('message')).toEqual('message');
    expect(
      normalizeMessage({
        message: 'The given data was invalid.',
        errors: { field: ['error message'] },
      }),
    ).toEqual('error message');

    expect(normalizeMessage({ message: 'not found' })).toEqual('not found');
  });

  test('convertEntityErrorToFieldData', () => {
    expect(
      convertEntityErrorToFieldData({
        message: 'The given data was invalid.',
        errors: { field: ['error message'] },
      }),
    ).toEqual([{ name: 'field', errors: ['error message'], value: undefined }]);

    expect(convertEntityErrorToFieldData({ field: 'This is error message' })).toEqual([
      { name: 'field', errors: ['This is error message'], value: undefined },
    ]);
  });
});
