import type { CollectionConfig } from 'payload/types'
import CustomImageCell from '../fields/CustomImageCell'

const Counters: CollectionConfig = {
  slug: 'counters',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ["name", "place"]
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
    {
      name: 'place',
      type: 'relationship',
      relationTo: 'places',
      hasMany: false,
    },
    {
      name: 'availabilities',
      type: 'relationship',
      relationTo: 'availabilities',
      hasMany: true,
    }
  ],
}

export default Counters
