import { TruncatePipe } from './truncate-pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  // Create a fresh pipe instance before each test
  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  // Test 1: pipe should be created
  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  // Test 2: should not truncate short text
  it('should return the original string if under the limit', () => {
    const result = pipe.transform('Hello', 50);
    expect(result).toBe('Hello');
  });

  // Test 3: should truncate long text and add ellipsis
  it('should truncate text longer than the limit', () => {
    const longText = 'This is a very long description that exceeds the limit';
    const result = pipe.transform(longText, 20);
    expect(result).toBe('This is a very long ' + '...');
  });

  // Test 4: should return empty string for empty input
  it('should return empty string for empty input', () => {
    const result = pipe.transform('', 50);
    expect(result).toBe('');
  });

  // Test 5: should use custom trail character
  it('should use custom trail when provided', () => {
    const result = pipe.transform('Hello World', 5, '---');
    expect(result).toBe('Hello---');
  });
});