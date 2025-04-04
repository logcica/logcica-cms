import type { CollectionConfig } from 'payload'
import { canManageOrContribute } from './canRead'
import categoriesField from '../fields/CategoriesField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'
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
        {
          type: 'relationship',
          name: 'place',
          label: getLabelTranslations('place'),
          relationTo: 'places',
        },
        {
          type: 'relationship',
          name: 'area',
          label: getLabelTranslations('area'),
          relationTo: 'places',
          filterOptions: () => {
            return {
              type: { in: ['region', 'country', 'province'] },
            }
          },
        },
      ],
    },
    {
      type: 'relationship',
      name: 'contacts',
      label: getLabelTranslations('contacts'),
      relationTo: 'contacts',
      hasMany: true,
    },
    {
      type: 'relationship',
      name: 'profiles',
      label: getLabelTranslations('profiles'),
      relationTo: 'profiles',
      hasMany: true,
    },
    {
      type: 'relationship',
      name: 'sectors',
      label: getLabelTranslations('sectors'),
      relationTo: 'sectors',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    ...categoriesField,
    ...uploadImagesField,
  ],
}

export default Partnerships
