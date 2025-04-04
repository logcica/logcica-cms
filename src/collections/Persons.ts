import type { CollectionConfig } from 'payload'
import { canManageOrContribute } from './canRead'
import categoriesField from '../fields/CategoriesField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'

const Persons: CollectionConfig = {
  slug: 'persons',
  labels: getCollectionLabelsTranslations('persons'),
  access: {
    read: canManageOrContribute({ placeInProperty: 'area' }),
  },
  admin: {
    useAsTitle: 'name',
    group: 'Structure',
    defaultColumns: ['name', 'contacts', 'id', 'place'],
  },
  fields: [
    {
      name: 'givenName',
      type: 'text',
      label: getLabelTranslations('givenName'),
    },
    {
      name: 'familyName',
      type: 'text',
      label: getLabelTranslations('familyName'),
    },
    {
      name: 'name',
      type: 'text',
      label: getLabelTranslations('name'),
      admin: {
        hidden: true, // hides the field from the admin panel
      },
      hooks: {
        beforeChange: [
          ({ data }: any) => {
            return [data.givenName, data.familyName].filter((n) => n).join(' ')
          },
        ],
        afterRead: [
          ({ data }: any) => {
            return data.name ?? [data.givenName, data.familyName].filter((n) => n).join(' ')
          },
        ],
      },
    },
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
    ...categoriesField,
  ],
}

export default Persons
