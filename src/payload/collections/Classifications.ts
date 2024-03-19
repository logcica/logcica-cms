import type { CollectionConfig } from 'payload/types'

const Classifications: CollectionConfig = {
  slug: 'classifications',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'key',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
    },
  ],
}

export default Classifications
