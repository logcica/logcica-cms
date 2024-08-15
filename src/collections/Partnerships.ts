import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead'
import categoriesField from '../fields/CategoriesField'
import { group } from 'console'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'

const Partnerships: CollectionConfig = {
  slug: 'partnerships',
  labels: getCollectionLabelsTranslations('partnerships'),
  admin: {
    useAsTitle: 'name',
    group: 'Structure',
    defaultColumns: ['name', 'area', 'categories', 'contacts', 'profiles'],
  },
  access: {
    read: canManageOrContribute({ placeInProperty: 'area' }),
  },
  fields: [
    nameField,
    {
      type: 'row',
      fields: [
        {
          name: 'place',
          type: 'relationship',
          label: getLabelTranslations('place'),
          relationTo: 'places',
          hasMany: false,
        },
        {
          name: 'area',
          type: 'relationship',
          label: getLabelTranslations('area'),
          relationTo: 'places',
          hasMany: false,
        },
      ],
    },
    {
      name: 'contacts',
      type: 'relationship',
      label: getLabelTranslations('contacts'),
      relationTo: 'contacts',
      hasMany: true,
    },
    {
      name: 'profiles',
      type: 'relationship',
      label: getLabelTranslations('profiles'),
      relationTo: 'profiles',
      hasMany: true,
    },
    categoriesField,
  ],
}

export default Partnerships
