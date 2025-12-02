import { describe, it, expect } from 'vitest';
import { formatHours } from '@/lib/utils';

describe('formatHours', () => {
  it('returns "0 hours" for 0 or negative', () => {
    expect(formatHours(0)).toBe('0 hours');
    expect(formatHours(-3)).toBe('0 hours');
  });

  it('returns singular for 1', () => {
    expect(formatHours(1)).toBe('1 hour');
  });

  it('returns plural for > 1', () => {
    expect(formatHours(5)).toBe('5 hours');
  });
});
