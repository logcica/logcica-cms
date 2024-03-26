import type { CollectionConfig } from 'payload/types'
import CustomImageCell from '../fields/CustomImageCell'

const Sessions: CollectionConfig = {
  slug: 'sessions',
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
    }
  ],
}

export default Sessions
