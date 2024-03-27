import type { CollectionConfig } from 'payload/types'

const Units: CollectionConfig = {
  slug: 'units',
  admin: {
    useAsTitle: 'id',
    group: 'Configuration'
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'symbol',
      type: 'text',
    },
    {
      name: 'key',
      type: 'text',
    }
  ],
}

export default Units
