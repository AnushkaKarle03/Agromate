import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword, createToken, verifyToken } from '../../src/lib/auth';

describe('Auth Utilities (PLAN-001)', () => {
  it('should hash password and verify correctly', async () => {
    const raw = 'FarmerSecret123';
    const hash = await hashPassword(raw);

    expect(hash).not.toBe(raw);
    expect(hash.startsWith('$2')).toBe(true);

    const isValid = await verifyPassword(raw, hash);
    expect(isValid).toBe(true);

    const isInvalid = await verifyPassword('WrongPassword', hash);
    expect(isInvalid).toBe(false);
  });

  it('should generate and verify JWT token with correct role payload', () => {
    const payload = {
      userId: 'user_123',
      role: 'FARMER' as const,
      phone: '9876543210',
      profileId: 'farmer_456',
    };

    const token = createToken(payload);
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3);

    const decoded = verifyToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.userId).toBe('user_123');
    expect(decoded?.role).toBe('FARMER');
    expect(decoded?.phone).toBe('9876543210');
    expect(decoded?.profileId).toBe('farmer_456');
  });

  it('should return null for malformed or forged JWT tokens', () => {
    expect(verifyToken('invalid.token.structure')).toBeNull();
    expect(verifyToken('')).toBeNull();
  });
});
