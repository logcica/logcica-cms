import type { CollectionConfig } from 'payload/types'
import GmapsCell from '../fields/GmapsCell'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'

const Places: CollectionConfig = {
  slug: 'places',
  labels: getCollectionLabelsTranslations('places'),
  admin: {
    useAsTitle: 'title',
    group: 'Structure',
    listSearchableFields: [
      'name',
      'address.street',
      'address.locality',
      'address.postalCode',
      'address.municipality',
    ],
    defaultColumns: ['title', 'center', 'within', 'key', 'type', 'gmaps'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      label: getLabelTranslations('key'),
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      fields: [
        nameField,
        {
          name: 'type',
          type: 'select',
          label: getLabelTranslations('type'),
          options: [
            {
              /*label: 'Adresse',*/
              label: getLabelTranslations('address'),
              value: 'address',
            },
            {
              /*label: 'Localité',*/
              label: getLabelTranslations('locality'),
              value: 'locality',
            },
            {
              /*label: 'Commune',*/
              label: getLabelTranslations('municipality'),
              value: 'municipality',
            },
            {
              /*label: 'Région',*/
              label: getLabelTranslations('region'),
              value: 'region',
            },
            {
              /*label: 'Pays',*/
              label: getLabelTranslations('country'),
              value: 'country',
            },
          ],
        },
      ],
    },
    {
      name: 'center',
      type: 'point',
      label: getLabelTranslations('center'),
    },
    ...logcicaRelationshipField({
      name: 'within',
      nameSingular: 'within',
      relationTo: 'places',
      hasMany: true,
      filterOptions: () => {
        return {
          type: { in: ['region', 'country', 'province'] },
        }
      },
    }),
    {
      name: 'title',
      type: 'text',
      label: getLabelTranslations('title'),
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            const address = data.address

            if (data.type && data.type != 'address') return data.name

            const localityParts = [address?.postalCode, address?.locality ?? address?.municipality]
            const list = [address?.street, localityParts.filter(n => n).join(' ')]

            if (!address?.street) list.unshift(data.name)

            if (list.every(n => !n)) return data.center

            return list.filter(n => n).join(', ')
          },
        ],
      },
    },
    /*
    {
      label: ({ data }) => data?.title || 'Untitled',
      type: 'collapsible', // required
      admin: {
        position: 'sidebar'
      },
      fields: [
        // required
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'someTextField',
          type: 'text',
          required: true,
        },
      ],
    },
    */
    {
      name: 'address', // required
      type: 'group', // required
      label: getLabelTranslations('address'),
      interfaceName: 'Address', // optional
      fields: [
        {
          name: 'street',
          type: 'text',
          label: getLabelTranslations('street'),
        },
        {
          type: 'row',
          fields: [
            {
              name: 'postalCode',
              type: 'text',
              label: getLabelTranslations('postalCode'),
            },
            {
              name: 'locality',
              type: 'text',
              label: getLabelTranslations('locality'),
            },
            {
              name: 'municipality',
              type: 'text',
              label: getLabelTranslations('municipality'),
            },
            {
              name: 'country',
              type: 'text',
              label: getLabelTranslations('country'),
            },
          ],
        },
      ],
    },
    {
      name: 'description',
      type: 'text',
      label: getLabelTranslations('description'),
    },
    {
      name: 'categories',
      type: 'relationship',
      label: getLabelTranslations('categories'),
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default Places
