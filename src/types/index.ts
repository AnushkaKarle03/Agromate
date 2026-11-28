export type UserRole = 'FARMER' | 'LABOURER' | 'MACHINE_OWNER' | 'ADMIN';

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
  role: string;
  roles?: string[];
  activeRole: UserRole;
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

export interface MachineProfile {
  id: string;
  userId: string;
  fullName: string;
  machineTypes: string;
  experienceYears: number;
  district: string;
  taluka?: string | null;
  village?: string | null;
}

export interface MachineListing {
  id: string;
  ownerId: string;
  title: string;
  machineType: 'TRACTOR' | 'HARVESTER' | 'SPRAYER' | 'ROTAVATOR' | 'THRESHER';
  hourlyRate: number;
  acreRate?: number | null;
  district: string;
  taluka?: string | null;
  village?: string | null;
  description?: string | null;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
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
  startDate: Date;
  endDate: Date;
  state: string;
  district: string;
  taluka?: string | null;
  village?: string | null;
  additionalPerks?: string | null;
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
  applications?: JobApplication[];
  farmer?: FarmerProfile;
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
  createdAt: Date;
  updatedAt: Date;
  jobPost?: JobPost;
  labourer?: LabourerProfile & {
    user?: {
      phone: string;
    };
  };
}

export interface PublicApplicant {
  id: string;
  labourerId: string;
  fullName: string;
  maskedPhone: string;
  skills: string;
  experienceYears: number;
  isCrewLeader: boolean;
  crewSize: number;
  district: string;
  workersOffered: number;
  applicantNote?: string | null;
  status: ApplicationStatus;
  unmaskedPhone?: string | null;
}
