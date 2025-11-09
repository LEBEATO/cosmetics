import { type Cosmetic } from '@prisma/client'

export type CosmeticType = Cosmetic & {
  isNew?: boolean
  available?: boolean
  owned?: boolean
  image?: string | null
}