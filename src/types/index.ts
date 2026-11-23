export type UserRole = 'FARMER' | 'LABOURER' | 'ADMIN';

export type JobActivity =
  | 'SOWING'
  | 'WEEDING'
  | 'SPRAYING'
  | 'HARVESTING'
  | 'PACKAGING'
  | 'GENERAL';

export type JobStatus = 'OPEN' | 'FILLED' | 'COMPLETED' | 'CANCELLED';

export type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';

export interface User {
  id: string;
  phone: string;
  email?: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface FarmerProfile {
  id: string;
  userId: string;
  fullName: string;
  farmName?: string | null;
  district: string;
  taluka?: string | null;
  village?: string | null;
  primaryCrops?: string | null;
}

export interface LabourerProfile {
  id: string;
  userId: string;
  fullName: string;
  skills: string;
  experienceYears: number;
  isCrewLeader: boolean;
  crewSize: number;
  district: string;
  taluka?: string | null;
  village?: string | null;
}

export interface JobPost {
  id: string;
  farmerId: string;
  title: string;
  cropType: string;
  activity: JobActivity;
  workersNeeded: number;
  dailyWage: number;
  wageType: string;
  startDate: string | Date;
  endDate: string | Date;
  district: string;
  taluka?: string | null;
  village?: string | null;
  additionalPerks?: string | null;
  status: JobStatus;
  createdAt: string | Date;
  _count?: {
    applications: number;
  };
}

export interface JobApplication {
  id: string;
  jobPostId: string;
  labourerId: string;
  workersOffered: number;
  applicantNote?: string | null;
  status: ApplicationStatus;
  createdAt: string | Date;
}
