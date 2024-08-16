import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead'
import categoriesField from '../fields/CategoriesField'
import { getCollectionLabelsTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'
import uploadImagesField from '../fields/imageField'

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
    ...logcicaRelationshipField({
      name: 'contacts',
      relationTo: 'contacts',
      hasMany: true,
      nameSingular: 'contact',
    }),
    ...logcicaRelationshipField({
      name: 'profiles',
      relationTo: 'profiles',
      hasMany: true,
      nameSingular: 'profile',
    }),
    ...categoriesField,
    ...uploadImagesField,
  ],
}

export default Partnerships
