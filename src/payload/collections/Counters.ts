import type { CollectionConfig } from 'payload/types'
import CustomImageCell from '../fields/CustomImageCell'

const Counters: CollectionConfig = {
  slug: 'counters',
  labels: {
    singular: {
      en: 'Counter',
      fr: 'Comptoir',
    },
    plural: {
      en: 'Counters',
      fr: 'Comptoirs',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ["name", "place"],
    group: 'Structure'
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
      name: 'marketplace',
      type: 'relationship',
      relationTo: 'counters'
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
