let expect = require('expect');
let { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'test';
    const text = 'A test message';
    const result = generateMessage(from, text);
    expect(result).toInclude({ from, text });
    expect(result.createdAt).toBeA('number');
  });
});
