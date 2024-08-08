import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead'
import categoriesField from '../fields/CategoriesField'
import { group } from 'console'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'

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
        ...logcicaRelationshipField({
          name: 'place',
          relationTo: 'places',
        }),
        ...logcicaRelationshipField({
          name: 'area',
          relationTo: 'places',
        }),
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
