import type { CollectionConfig } from 'payload/types'
import { canManage } from './canRead'

const Partnerships: CollectionConfig = {
  slug: 'partnerships',
  labels: {
    singular: {
      en: 'Partnership',
      fr: 'Partenariat',
    },
    plural: {
      en: 'Partnerships',
      fr: 'Partenariats',
    },
  },
  admin: {
    useAsTitle: 'name',
    group: 'Structure'
  },
  access: {
    read: canManage({placeInProperty: 'area'}),
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
      name: 'area',
      type: 'relationship',
      relationTo: 'places',
      hasMany: false,
    },
  ],
}

export default Partnerships
