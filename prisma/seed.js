const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@thedigitalarmss.com'
  const password = 'Admin@123'
  const hashedPassword = await bcrypt.hash(password, 12)

  await prisma.adminUser.upsert({
    where: { email },
    update: {
      name: 'Administrator',
      password: hashedPassword,
      role: 'admin',
      isSuperAdmin: true
    },
    create: {
      email,
      name: 'Administrator',
      password: hashedPassword,
      role: 'admin',
      isSuperAdmin: true
    }
  })

  console.log(`Seeded admin user: ${email}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })