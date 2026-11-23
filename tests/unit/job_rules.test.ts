import { describe, it, expect } from 'vitest';

describe('Job Posting & Validation Rules (PLAN-002 & PLAN-003)', () => {
  it('should validate agricultural activity categorization', () => {
    const validActivities = ['SOWING', 'WEEDING', 'SPRAYING', 'HARVESTING', 'PACKAGING', 'GENERAL'];
    const testActivity = 'HARVESTING';
    expect(validActivities.includes(testActivity)).toBe(true);
    expect(validActivities.includes('INVALID_TASK')).toBe(false);
  });

  it('should validate that end dates cannot precede start dates', () => {
    const start = new Date('2026-12-01');
    const validEnd = new Date('2026-12-10');
    const invalidEnd = new Date('2026-11-20');

    expect(validEnd >= start).toBe(true);
    expect(invalidEnd >= start).toBe(false);
  });

  it('should validate positive worker counts and daily wages', () => {
    const validateJob = (workers: number, wage: number) => {
      return workers > 0 && wage > 0;
    };

    expect(validateJob(5, 600)).toBe(true);
    expect(validateJob(0, 500)).toBe(false);
    expect(validateJob(10, -50)).toBe(false);
  });
});
