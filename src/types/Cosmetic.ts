export type Cosmetic = {
  id: number
  externalId?: string
  name: string
  description?: string | null
  image?: string | null
  rarity?: string | null
  type?: string | null
  price: number
  isNew?: boolean
  available?: boolean
  createdAt?: Date
}

export type CosmeticType = Cosmetic & {
  isNew?: boolean
  available?: boolean
  owned?: boolean
  image?: string | null
}
