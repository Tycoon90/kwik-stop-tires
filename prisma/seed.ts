import { PrismaClient, TireType } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import bcrypt from 'bcryptjs'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter } as any)

// Varied real tire photos from Unsplash — different angles/styles per slot
const IMAGES = {
  allSeason: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop',
    'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=600&q=80&fit=crop',
    'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600&q=80&fit=crop',
    'https://images.unsplash.com/photo-1646032769041-fd7e96c4d9fa?w=600&q=80&fit=crop',
  ],
  performance: [
    'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&q=80&fit=crop',
    'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&q=80&fit=crop',
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&q=80&fit=crop',
  ],
  winter: [
    'https://images.unsplash.com/photo-1547038577-da80abbc4f19?w=600&q=80&fit=crop',
    'https://images.unsplash.com/photo-1504222490345-c075b626b35a?w=600&q=80&fit=crop',
    'https://images.unsplash.com/photo-1612544448446-e5f5b7e66e47?w=600&q=80&fit=crop',
  ],
  truck: [
    'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80&fit=crop',
    'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&q=80&fit=crop',
  ],
  allTerrain: [
    'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80&fit=crop',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80&fit=crop',
  ],
  summer: [
    'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=600&q=80&fit=crop',
    'https://images.unsplash.com/photo-1597404294360-feeeda04612e?w=600&q=80&fit=crop',
  ],
}

const pick = (arr: string[], i: number) => arr[i % arr.length]

const tires = [
  // Michelin
  { brand: 'Michelin', model: 'Defender2', size: '225/65R17', width: 225, aspectRatio: 65, diameter: 17, price: 189.99, type: TireType.ALL_SEASON, stock: 20, rating: 4.8, reviewCount: 312, image: pick(IMAGES.allSeason, 0), specs: { speedRating: 'H', loadIndex: 102, treadDepth: 10.5, mileageWarranty: 80000, utqg: '820 A A' }, featured: true },
  { brand: 'Michelin', model: 'Pilot Sport 4S', size: '245/40R18', width: 245, aspectRatio: 40, diameter: 18, price: 259.99, type: TireType.PERFORMANCE, stock: 12, rating: 4.9, reviewCount: 189, image: pick(IMAGES.performance, 0), specs: { speedRating: 'Y', loadIndex: 97, treadDepth: 9.5, mileageWarranty: 30000, utqg: '300 AA A' }, featured: true },
  { brand: 'Michelin', model: 'CrossClimate2', size: '215/55R17', width: 215, aspectRatio: 55, diameter: 17, price: 219.99, type: TireType.ALL_SEASON, stock: 18, rating: 4.7, reviewCount: 245, image: pick(IMAGES.allSeason, 1), specs: { speedRating: 'V', loadIndex: 98, treadDepth: 10.0, mileageWarranty: 60000, utqg: '640 A A' } },
  { brand: 'Michelin', model: 'LTX M/S2', size: '265/70R17', width: 265, aspectRatio: 70, diameter: 17, price: 229.99, type: TireType.TRUCK_SUV, stock: 15, rating: 4.6, reviewCount: 178, image: pick(IMAGES.truck, 0), specs: { speedRating: 'T', loadIndex: 115, treadDepth: 11.0, mileageWarranty: 50000, utqg: '500 B B' } },
  { brand: 'Michelin', model: 'X-Ice Snow', size: '205/55R16', width: 205, aspectRatio: 55, diameter: 16, price: 179.99, type: TireType.WINTER, stock: 8, rating: 4.8, reviewCount: 134, image: pick(IMAGES.winter, 0), specs: { speedRating: 'H', loadIndex: 94, treadDepth: 11.5, mileageWarranty: 40000, utqg: 'N/A' } },

  // Goodyear
  { brand: 'Goodyear', model: 'Assurance WeatherReady 2', size: '225/60R17', width: 225, aspectRatio: 60, diameter: 17, price: 169.99, type: TireType.ALL_SEASON, stock: 22, rating: 4.5, reviewCount: 267, image: pick(IMAGES.allSeason, 2), specs: { speedRating: 'H', loadIndex: 99, treadDepth: 10.5, mileageWarranty: 60000, utqg: '700 A A' }, featured: true },
  { brand: 'Goodyear', model: 'Eagle Exhilarate', size: '245/45R18', width: 245, aspectRatio: 45, diameter: 18, price: 199.99, type: TireType.PERFORMANCE, stock: 10, rating: 4.4, reviewCount: 98, image: pick(IMAGES.performance, 1), specs: { speedRating: 'Z', loadIndex: 96, treadDepth: 9.0, mileageWarranty: 45000, utqg: '400 AA A' } },
  { brand: 'Goodyear', model: 'Wrangler TrailRunner AT', size: '265/75R16', width: 265, aspectRatio: 75, diameter: 16, price: 189.99, type: TireType.ALL_TERRAIN, stock: 14, rating: 4.6, reviewCount: 156, image: pick(IMAGES.allTerrain, 0), specs: { speedRating: 'S', loadIndex: 112, treadDepth: 13.0, mileageWarranty: 50000, utqg: '500 B C' } },
  { brand: 'Goodyear', model: 'Ultra Grip Ice WRT Gen-3', size: '215/60R16', width: 215, aspectRatio: 60, diameter: 16, price: 149.99, type: TireType.WINTER, stock: 6, rating: 4.5, reviewCount: 89, image: pick(IMAGES.winter, 1), specs: { speedRating: 'T', loadIndex: 95, treadDepth: 11.0, mileageWarranty: 30000, utqg: 'N/A' } },
  { brand: 'Goodyear', model: 'Reliant All-Season', size: '195/65R15', width: 195, aspectRatio: 65, diameter: 15, price: 109.99, type: TireType.ALL_SEASON, stock: 30, rating: 4.3, reviewCount: 203, image: pick(IMAGES.allSeason, 3), specs: { speedRating: 'H', loadIndex: 91, treadDepth: 9.5, mileageWarranty: 65000, utqg: '600 A A' } },

  // Bridgestone
  { brand: 'Bridgestone', model: 'Turanza EL450', size: '235/45R18', width: 235, aspectRatio: 45, diameter: 18, price: 199.99, type: TireType.ALL_SEASON, stock: 16, rating: 4.5, reviewCount: 145, image: pick(IMAGES.allSeason, 0), specs: { speedRating: 'V', loadIndex: 94, treadDepth: 10.0, mileageWarranty: 70000, utqg: '700 A A' }, featured: true },
  { brand: 'Bridgestone', model: 'Potenza Sport', size: '255/40R19', width: 255, aspectRatio: 40, diameter: 19, price: 279.99, type: TireType.PERFORMANCE, stock: 8, rating: 4.7, reviewCount: 112, image: pick(IMAGES.performance, 2), specs: { speedRating: 'Y', loadIndex: 100, treadDepth: 9.0, mileageWarranty: 30000, utqg: '280 AA A' } },
  { brand: 'Bridgestone', model: 'Dueler H/T 685', size: '275/65R18', width: 275, aspectRatio: 65, diameter: 18, price: 219.99, type: TireType.TRUCK_SUV, stock: 12, rating: 4.4, reviewCount: 167, image: pick(IMAGES.truck, 1), specs: { speedRating: 'H', loadIndex: 116, treadDepth: 10.5, mileageWarranty: 55000, utqg: '500 A B' } },
  { brand: 'Bridgestone', model: 'Blizzak WS90', size: '225/50R17', width: 225, aspectRatio: 50, diameter: 17, price: 169.99, type: TireType.WINTER, stock: 10, rating: 4.8, reviewCount: 198, image: pick(IMAGES.winter, 2), specs: { speedRating: 'H', loadIndex: 94, treadDepth: 11.5, mileageWarranty: 40000, utqg: 'N/A' } },

  // Cooper
  { brand: 'Cooper', model: 'Discoverer AT3 4S', size: '265/70R16', width: 265, aspectRatio: 70, diameter: 16, price: 159.99, type: TireType.ALL_TERRAIN, stock: 18, rating: 4.5, reviewCount: 234, image: pick(IMAGES.allTerrain, 1), specs: { speedRating: 'T', loadIndex: 112, treadDepth: 12.5, mileageWarranty: 60000, utqg: '560 B B' } },
  { brand: 'Cooper', model: 'CS5 Ultra Touring', size: '215/60R16', width: 215, aspectRatio: 60, diameter: 16, price: 119.99, type: TireType.ALL_SEASON, stock: 24, rating: 4.3, reviewCount: 178, image: pick(IMAGES.allSeason, 1), specs: { speedRating: 'H', loadIndex: 95, treadDepth: 10.0, mileageWarranty: 70000, utqg: '700 A A' } },
  { brand: 'Cooper', model: 'Zeon RS3-G1', size: '245/45R17', width: 245, aspectRatio: 45, diameter: 17, price: 149.99, type: TireType.PERFORMANCE, stock: 10, rating: 4.4, reviewCount: 89, image: pick(IMAGES.performance, 0), specs: { speedRating: 'W', loadIndex: 95, treadDepth: 10.0, mileageWarranty: 45000, utqg: '400 AA A' } },

  // Falken
  { brand: 'Falken', model: 'Wildpeak AT3W', size: '265/60R18', width: 265, aspectRatio: 60, diameter: 18, price: 169.99, type: TireType.ALL_TERRAIN, stock: 16, rating: 4.7, reviewCount: 312, image: pick(IMAGES.allTerrain, 0), specs: { speedRating: 'H', loadIndex: 114, treadDepth: 12.7, mileageWarranty: 55000, utqg: '55 C B' }, featured: true },
  { brand: 'Falken', model: 'Azenis FK460 A/S', size: '225/45R17', width: 225, aspectRatio: 45, diameter: 17, price: 129.99, type: TireType.ALL_SEASON, stock: 20, rating: 4.4, reviewCount: 145, image: pick(IMAGES.allSeason, 2), specs: { speedRating: 'W', loadIndex: 91, treadDepth: 10.0, mileageWarranty: 50000, utqg: '560 A A' } },
  { brand: 'Falken', model: 'Eurowinter HS01', size: '205/55R16', width: 205, aspectRatio: 55, diameter: 16, price: 119.99, type: TireType.WINTER, stock: 8, rating: 4.5, reviewCount: 67, image: pick(IMAGES.winter, 0), specs: { speedRating: 'V', loadIndex: 94, treadDepth: 11.0, mileageWarranty: 30000, utqg: 'N/A' } },

  // Nexen
  { brand: 'Nexen', model: 'N5000 Platinum', size: '215/55R17', width: 215, aspectRatio: 55, diameter: 17, price: 99.99, type: TireType.ALL_SEASON, stock: 28, rating: 4.2, reviewCount: 189, image: pick(IMAGES.allSeason, 3), specs: { speedRating: 'H', loadIndex: 94, treadDepth: 10.0, mileageWarranty: 75000, utqg: '740 A B' } },
  { brand: 'Nexen', model: 'Roadian AT Pro RA8', size: '275/60R20', width: 275, aspectRatio: 60, diameter: 20, price: 179.99, type: TireType.ALL_TERRAIN, stock: 12, rating: 4.3, reviewCount: 134, image: pick(IMAGES.allTerrain, 1), specs: { speedRating: 'T', loadIndex: 119, treadDepth: 13.0, mileageWarranty: 55000, utqg: '500 B C' } },
  { brand: 'Nexen', model: 'NFera Sport', size: '235/40R18', width: 235, aspectRatio: 40, diameter: 18, price: 119.99, type: TireType.SUMMER, stock: 14, rating: 4.3, reviewCount: 78, image: pick(IMAGES.summer, 0), specs: { speedRating: 'Y', loadIndex: 95, treadDepth: 9.5, mileageWarranty: 30000, utqg: '280 AA A' } },

  // Pirelli
  { brand: 'Pirelli', model: 'Cinturato P7 All Season', size: '225/50R17', width: 225, aspectRatio: 50, diameter: 17, price: 179.99, type: TireType.ALL_SEASON, stock: 16, rating: 4.6, reviewCount: 167, image: pick(IMAGES.allSeason, 1), specs: { speedRating: 'V', loadIndex: 94, treadDepth: 10.5, mileageWarranty: 70000, utqg: '700 A A' } },
  { brand: 'Pirelli', model: 'P Zero', size: '265/35R20', width: 265, aspectRatio: 35, diameter: 20, price: 319.99, type: TireType.PERFORMANCE, stock: 6, rating: 4.8, reviewCount: 145, image: pick(IMAGES.performance, 1), specs: { speedRating: 'Y', loadIndex: 95, treadDepth: 9.0, mileageWarranty: 20000, utqg: '180 AA A' } },
  { brand: 'Pirelli', model: 'Scorpion All Terrain Plus', size: '255/55R20', width: 255, aspectRatio: 55, diameter: 20, price: 249.99, type: TireType.ALL_TERRAIN, stock: 10, rating: 4.5, reviewCount: 112, image: pick(IMAGES.allTerrain, 0), specs: { speedRating: 'T', loadIndex: 110, treadDepth: 12.0, mileageWarranty: 50000, utqg: '450 B B' } },
  { brand: 'Pirelli', model: 'Sottozero 3', size: '225/45R17', width: 225, aspectRatio: 45, diameter: 17, price: 199.99, type: TireType.WINTER, stock: 8, rating: 4.7, reviewCount: 89, image: pick(IMAGES.winter, 1), specs: { speedRating: 'V', loadIndex: 91, treadDepth: 11.0, mileageWarranty: 30000, utqg: 'N/A' } },

  // Firestone
  { brand: 'Firestone', model: 'All Season', size: '205/60R16', width: 205, aspectRatio: 60, diameter: 16, price: 89.99, type: TireType.ALL_SEASON, stock: 32, rating: 4.1, reviewCount: 267, image: pick(IMAGES.allSeason, 0), specs: { speedRating: 'H', loadIndex: 92, treadDepth: 10.0, mileageWarranty: 65000, utqg: '600 A B' } },
  { brand: 'Firestone', model: 'Destination AT2', size: '255/70R16', width: 255, aspectRatio: 70, diameter: 16, price: 139.99, type: TireType.ALL_TERRAIN, stock: 18, rating: 4.3, reviewCount: 198, image: pick(IMAGES.allTerrain, 1), specs: { speedRating: 'T', loadIndex: 111, treadDepth: 12.0, mileageWarranty: 50000, utqg: '480 B C' } },
  { brand: 'Firestone', model: 'Firehawk Indy 500', size: '215/45R17', width: 215, aspectRatio: 45, diameter: 17, price: 129.99, type: TireType.SUMMER, stock: 12, rating: 4.4, reviewCount: 134, image: pick(IMAGES.summer, 1), specs: { speedRating: 'Z', loadIndex: 87, treadDepth: 9.5, mileageWarranty: 30000, utqg: '300 AA A' } },
]

async function main() {
  console.log('Seeding database...')

  // Clear existing tires first
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.review.deleteMany()
  await prisma.tire.deleteMany()

  const hashedAdminPassword = await bcrypt.hash('admin123', 10)
  const hashedUserPassword = await bcrypt.hash('customer123', 10)

  await prisma.user.upsert({
    where: { email: 'admin@kwikstoptires.com' },
    update: {},
    create: { name: 'Admin User', email: 'admin@kwikstoptires.com', password: hashedAdminPassword, role: 'ADMIN', phone: '(916) 968-3262' },
  })

  await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: { name: 'Test Customer', email: 'customer@example.com', password: hashedUserPassword, role: 'CUSTOMER', phone: '(555) 123-4567' },
  })

  for (const tire of tires) {
    await prisma.tire.create({ data: tire })
  }

  await prisma.promoCode.createMany({
    data: [
      { code: 'KWIK20', discount: 20, type: 'FIXED', active: true },
      { code: 'SAVE10', discount: 10, type: 'PERCENTAGE', active: true },
    ],
    skipDuplicates: true,
  })

  console.log(`Seeded ${tires.length} tires and 2 users.`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
