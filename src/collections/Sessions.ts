import type { CollectionConfig } from 'payload'
import categoriesField from '../fields/CategoriesField'
import { canManageOrContribute } from './canRead'
import partyField from '../fields/partyField'
import descriptionField from '../fields/descriptionField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'
import uploadImagesField from '../fields/imageField'

const Sessions: CollectionConfig = {
  slug: 'sessions',
  labels: getCollectionLabelsTranslations('sessions'),
  admin: {
    useAsTitle: 'name',
    group: 'Gestion',
    defaultColumns: ['name', 'place', 'manager', 'parent', 'categories', 'timeRange'],
  },
  access: {
    read: canManageOrContribute({ tenancyInAnyProperty: ['manager'] }),
  },
  fields: [
    nameField,
    {
      type: 'relationship',
      name: 'parent',
      label: getLabelTranslations('parent'),
      relationTo: 'sessions',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'timeRange',
      type: 'group',
      label: getLabelTranslations('timeRange'),
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'from',
              type: 'date',
              label: getLabelTranslations('from'),
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'to',
              type: 'date',
              label: getLabelTranslations('to'),
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
          ],
        },
      ],
    },
    descriptionField({}),
    ...categoriesField,
    ...partyField({
      name: 'manager',
      position: 'sidebar',
      relations: ['organisations', 'partnerships', 'activities'],
    }),
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
          name: 'catalog',
          label: getLabelTranslations('catalog'),
          relationTo: 'catalogs',
        },
      ],
    },
    {
      type: 'relationship',
      name: 'profiles',
      label: getLabelTranslations('profiles'),
      relationTo: 'profiles',
      hasMany: true,
    },
    {
      name: 'subject',
      type: 'group',
      label: getLabelTranslations('subject'),
      fields: [
        {
          type: 'relationship',
          name: 'counter',
          label: getLabelTranslations('counter'),
          relationTo: 'counters',
        },
      ],
    },
    ...uploadImagesField,
  ],
}

export default Sessions
