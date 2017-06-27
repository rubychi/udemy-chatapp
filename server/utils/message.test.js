let expect = require('expect');
let { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'test';
    const text = 'A test message';
    const result = generateMessage(from, text);
    expect(result).toInclude({ from, text });
    expect(result.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Ruby';
    const latitude = '123';
    const longitude = '456';
    const result = generateLocationMessage(from, latitude, longitude);
    expect(result).toInclude({
      from,
      url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    });
  });
});
