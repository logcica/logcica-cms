import type { CollectionConfig } from 'payload/types'
import CustomImageCell from '../fields/CustomImageCell'

const Availabilities: CollectionConfig = {
  slug: 'availabilities',
  labels: {
    singular: {
      en: 'Availability',
      fr: 'Disponibilité',
    },
    plural: {
      en: 'Availabilities',
      fr: 'Disponibilités',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ["name", "place"],
    group: 'Gestion'
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
      name: 'season',
      type: 'relationship',
      relationTo: 'season_availabilities',
      hasMany: false,
    },
    {
      name: 'week',
      type: 'relationship',
      relationTo: 'week_availabilities',
      hasMany: false,
    }
  ],
}

export default Availabilities
