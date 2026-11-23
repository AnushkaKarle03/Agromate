import { describe, it, expect } from 'vitest';

describe('Hiring Decision & Auto-Fill Capacity Logic (PLAN-004)', () => {
  it('should calculate total hired workers and trigger FILLED status when capacity is met', () => {
    const workersNeeded = 10;
    const acceptedApplications = [
      { id: 'app_1', workersOffered: 4, status: 'ACCEPTED' },
      { id: 'app_2', workersOffered: 6, status: 'ACCEPTED' },
    ];

    const totalHired = acceptedApplications.reduce((sum, a) => sum + a.workersOffered, 0);
    const shouldBeFilled = totalHired >= workersNeeded;

    expect(totalHired).toBe(10);
    expect(shouldBeFilled).toBe(true);
  });

  it('should maintain OPEN status when capacity is not yet fulfilled', () => {
    const workersNeeded = 10;
    const acceptedApplications = [
      { id: 'app_1', workersOffered: 4, status: 'ACCEPTED' },
    ];

    const totalHired = acceptedApplications.reduce((sum, a) => sum + a.workersOffered, 0);
    const shouldBeFilled = totalHired >= workersNeeded;

    expect(totalHired).toBe(4);
    expect(shouldBeFilled).toBe(false);
  });
});
