import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead'
import categoriesField from '../fields/CategoriesField'
import { ComboField } from '@nouance/payload-better-fields-plugin'
import { getCollectionLabelsTranslations } from '../utilities/translate'

const Persons: CollectionConfig = {
  slug: 'persons',
  /*labels: getCollectionLabelsTranslations('persons'),*/
  labels: {
    singular: {
      en: 'Person',
      fr: 'Personne',
    },
    plural: {
      en: 'Persons',
      fr: 'Personnes',
    },
  },
  access: {
    read: canManageOrContribute({ placeInProperty: 'area' }),
  },
  admin: {
    useAsTitle: 'name',
    group: 'Structure',
    defaultColumns: ['name','contacts','id','place'],
  },
  fields: [
    {
      name: 'givenName',
      type: 'text',
    },
    {
      name: 'familyName',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
      admin: {
        hidden: true, // hides the field from the admin panel
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            return [data.givenName, data.familyName].filter(n => n).join(' ')
          },
        ],
        afterRead: [
          ({ data }) => {
            return data.name ?? [data.givenName, data.familyName].filter(n => n).join(' ')
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
          relationTo: 'places',
          hasMany: false,
        },
        {
          name: 'area',
          type: 'relationship',
          relationTo: 'places',
          hasMany: false,
        },
      ],
    },
    {
      name: 'contacts',
      type: 'relationship',
      relationTo: 'contacts',
      hasMany: true,
    },
    {
      name: 'profiles',
      type: 'relationship',
      relationTo: 'profiles',
      hasMany: true,
    },
    categoriesField,
  ],
}

export default Persons
