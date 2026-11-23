import { describe, it, expect } from 'vitest';
import { maskPhoneNumber, serializeApplicant } from '../../src/lib/serializers';

describe('Privacy Serializers & Contact Masking (PLAN-004)', () => {
  it('should mask phone numbers preserving only 2-digit prefix and suffix', () => {
    expect(maskPhoneNumber('9876543210')).toBe('98******10');
    expect(maskPhoneNumber('9123456789')).toBe('91******89');
    expect(maskPhoneNumber('123')).toBe('******');
  });

  it('should mask phone number when applicant status is PENDING or REJECTED', () => {
    const mockApp = {
      id: 'app_1',
      jobPostId: 'job_1',
      labourerId: 'lab_1',
      workersOffered: 4,
      status: 'PENDING',
      createdAt: new Date(),
      labourer: {
        fullName: 'Ramesh Patil',
        skills: 'Harvesting',
        experienceYears: 5,
        isCrewLeader: true,
        crewSize: 4,
        district: 'Nashik',
        user: { phone: '9822012345' },
      },
    };

    const pendingResult = serializeApplicant(mockApp, false);
    expect(pendingResult.isPhoneMasked).toBe(true);
    expect(pendingResult.phone).toBe('98******45');
    expect(pendingResult.labourerName).toBe('Ramesh Patil');

    const acceptedResult = serializeApplicant(mockApp, true);
    expect(acceptedResult.isPhoneMasked).toBe(false);
    expect(acceptedResult.phone).toBe('9822012345');
  });
});
