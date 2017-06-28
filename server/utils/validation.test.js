const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const value = 4234;
    expect(isRealString(value)).toBe(false);
  });
  it('should reject string with only spaces', () => {
    const value = '   ';
    expect(isRealString(value)).toBe(false);
  });
  it('should allow string with non-space characters', () => {
    const value = '  passed    ';
    expect(isRealString(value)).toBe(true);
  });
});
