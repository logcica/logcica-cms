import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead'
import categoriesField from '../fields/CategoriesField'
import { getCollectionLabelsTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'
import uploadImagesField from '../fields/imageField'
import shortNameField from '../fields/shortNameField'

const Partnerships: CollectionConfig = {
  slug: 'partnerships',
  labels: getCollectionLabelsTranslations('partnerships'),
  admin: {
    useAsTitle: 'name',
    group: 'Structure',
    defaultColumns: ['name', 'area', 'sectors', 'categories', 'contacts', 'profiles'],
  },
  access: {
    read: canManageOrContribute({ placeInProperty: 'area' }),
  },
  fields: [
    {
      type: 'row',
      fields: [nameField, shortNameField],
    },
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
          filterOptions: () => {
            return {
              type: { in: ['region', 'country', 'province'] },
            }
          },
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
    ...logcicaRelationshipField({
      name: 'sectors',
      nameSingular: 'sector',
      relationTo: 'sectors',
      hasMany: true,
      position: 'sidebar',
    }),
    ...categoriesField,
    ...uploadImagesField,
  ],
}

export default Partnerships
