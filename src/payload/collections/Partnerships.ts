import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead'
import categoriesField from '../fields/CategoriesField'
import { group } from 'console'

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
    read: canManageOrContribute({placeInProperty: 'area'}),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'place',
          type: 'relationship',
          relationTo: 'places',
          hasMany: false,
        },
        {
          name: 'area',
          type: 'relationship',
          relationTo: 'places',
          hasMany: false
        },
      ]
    },
    {
      name: 'contacts',
      type: 'relationship',
      relationTo: 'contacts',
      hasMany: true
    },
    {
      name: 'profiles',
      type: 'relationship',
      relationTo: 'profiles',
      hasMany: true
    },
    categoriesField,
  ],
}

export default Partnerships
