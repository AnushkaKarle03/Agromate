/**
 * Masks phone numbers to protect privacy until explicit mutual agreement.
 * e.g., "9876543210" -> "98******10"
 */
export function maskPhoneNumber(phone: string): string {
  if (!phone || phone.length < 6) return '******';
  const prefix = phone.slice(0, 2);
  const suffix = phone.slice(-2);
  return `${prefix}******${suffix}`;
}

export interface SanitizedApplicant {
  id: string;
  jobPostId: string;
  labourerId: string;
  labourerName: string;
  phone: string;
  isPhoneMasked: boolean;
  skills: string;
  experienceYears: number;
  isCrewLeader: boolean;
  crewSize: number;
  district: string;
  village?: string | null;
  workersOffered: number;
  applicantNote?: string | null;
  status: string;
  createdAt: Date;
}

export function serializeApplicant(application: any, isAccepted = false): SanitizedApplicant {
  const labourer = application.labourer;
  const user = labourer?.user;
  const rawPhone = user?.phone || '';

  return {
    id: application.id,
    jobPostId: application.jobPostId,
    labourerId: application.labourerId,
    labourerName: labourer?.fullName || 'Worker',
    phone: isAccepted ? rawPhone : maskPhoneNumber(rawPhone),
    isPhoneMasked: !isAccepted,
    skills: labourer?.skills || '',
    experienceYears: labourer?.experienceYears || 0,
    isCrewLeader: labourer?.isCrewLeader || false,
    crewSize: labourer?.crewSize || 1,
    district: labourer?.district || '',
    village: labourer?.village,
    workersOffered: application.workersOffered || 1,
    applicantNote: application.applicantNote,
    status: application.status,
    createdAt: application.createdAt,
  };
}
