import { PrismaClient } from '@prisma/client'
import { PERMISSIONS } from '../lib/permission-definitions'

const db = new PrismaClient()

async function main() {
  for (const permission of Object.values(PERMISSIONS)) {
    await db.permission.upsert({
      where: { name: permission.name },
      update: { category: permission.category, description: permission.description, defaultEnabled: false },
      create: { name: permission.name, category: permission.category, description: permission.description, defaultEnabled: false }
    })
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await db.$disconnect()
  })