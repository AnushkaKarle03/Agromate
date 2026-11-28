import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Agromate database...');

  // Clean existing data
  await prisma.jobApplication.deleteMany({});
  await prisma.jobPost.deleteMany({});
  await prisma.farmerProfile.deleteMany({});
  await prisma.labourerProfile.deleteMany({});
  await prisma.user.deleteMany({});

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create Demo Farmer
  const farmerUser = await prisma.user.create({
    data: {
      phone: '9822001122',
      email: 'anand.shinde@agromate.in',
      passwordHash,
      role: 'FARMER',
      farmerProfile: {
        create: {
          fullName: 'Anand Shinde',
          farmName: 'Shinde Agro Orchards & Fields',
          district: 'Pune',
          taluka: 'Baramati',
          village: 'Malegaon',
          primaryCrops: 'Sugarcane, Wheat, Pomegranate',
        },
      },
    },
    include: { farmerProfile: true },
  });

  const farmerProfile = farmerUser.farmerProfile!;

  // 2. Create Demo Crew Leader (Mukaddam)
  const mukaddamUser = await prisma.user.create({
    data: {
      phone: '9833445566',
      email: 'suresh.patil@agromate.in',
      passwordHash,
      role: 'LABOURER',
      labourerProfile: {
        create: {
          fullName: 'Suresh Patil (Mukaddam)',
          skills: 'Harvesting, Threshing, Loading',
          experienceYears: 8,
          isCrewLeader: true,
          crewSize: 6,
          district: 'Pune',
          taluka: 'Daund',
          village: 'Patas',
        },
      },
    },
    include: { labourerProfile: true },
  });

  // 3. Create Demo Individual Labourer
  const labourerUser = await prisma.user.create({
    data: {
      phone: '9877889900',
      email: 'sunita.jadhav@agromate.in',
      passwordHash,
      role: 'LABOURER',
      labourerProfile: {
        create: {
          fullName: 'Sunita Jadhav',
          skills: 'Weeding, Sowing, Vegetable Picking',
          experienceYears: 4,
          isCrewLeader: false,
          crewSize: 1,
          district: 'Nashik',
          taluka: 'Niphad',
          village: 'Pimpalgaon',
        },
      },
    },
    include: { labourerProfile: true },
  });

  // 4. Create Job Posts
  const now = new Date();
  const nextWeek = new Date(Date.now() + 7 * 86400000);
  const inTwoWeeks = new Date(Date.now() + 14 * 86400000);

  const job1 = await prisma.jobPost.create({
    data: {
      farmerId: farmerProfile.id,
      title: 'Urgent Sugarcane Harvesting Team Needed',
      cropType: 'Sugarcane',
      activity: 'HARVESTING',
      workersNeeded: 6,
      dailyWage: 650,
      wageType: 'PER_DAY',
      startDate: now,
      endDate: nextWeek,
      state: 'Maharashtra',
      district: 'Pune',
      taluka: 'Baramati',
      village: 'Malegaon',
      additionalPerks: 'Morning breakfast and tea provided on-field',
      status: 'OPEN',
    },
  });

  const job2 = await prisma.jobPost.create({
    data: {
      farmerId: farmerProfile.id,
      title: 'Pomegranate Spraying & Orchard Pruning',
      cropType: 'Pomegranate',
      activity: 'SPRAYING',
      workersNeeded: 3,
      dailyWage: 700,
      wageType: 'PER_DAY',
      startDate: now,
      endDate: nextWeek,
      state: 'Maharashtra',
      district: 'Pune',
      taluka: 'Baramati',
      village: 'Songaon',
      additionalPerks: 'Safety equipment and masks provided',
      status: 'OPEN',
    },
  });

  const job3 = await prisma.jobPost.create({
    data: {
      farmerId: farmerProfile.id,
      title: 'Wheat Field De-Weeding Workers (Women Team Preferred)',
      cropType: 'Wheat',
      activity: 'WEEDING',
      workersNeeded: 4,
      dailyWage: 500,
      wageType: 'PER_DAY',
      startDate: nextWeek,
      endDate: inTwoWeeks,
      state: 'Maharashtra',
      district: 'Nashik',
      taluka: 'Niphad',
      village: 'Pimpalgaon',
      additionalPerks: 'Flexible hours (7 AM to 1 PM)',
      status: 'OPEN',
    },
  });

  // 5. Create Applications
  // Suresh Patil applies to Job 1 (Sugarcane)
  await prisma.jobApplication.create({
    data: {
      jobPostId: job1.id,
      labourerId: mukaddamUser.labourerProfile!.id,
      workersOffered: 6,
      applicantNote: 'Our team has 6 experienced harvesters with our own sickles.',
      status: 'ACCEPTED', // Pre-accepted to showcase contact reveal!
    },
  });

  // Sunita Jadhav applies to Job 3 (Weeding)
  await prisma.jobApplication.create({
    data: {
      jobPostId: job3.id,
      labourerId: labourerUser.labourerProfile!.id,
      workersOffered: 1,
      applicantNote: 'Available for daily weeding work.',
      status: 'PENDING', // Pending to showcase farmer review action!
    },
  });

  console.log('✅ Database seeded successfully:');
  console.log('  👨‍🌾 Farmer: phone 9822001122 / password123');
  console.log('  🧑‍🌾 Mukaddam: phone 9833445566 / password123');
  console.log('  🧑‍🌾 Labourer: phone 9877889900 / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
