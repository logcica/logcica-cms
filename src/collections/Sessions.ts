import type { CollectionConfig } from 'payload/types'
import categoriesField from '../fields/CategoriesField'
import { canManageOrContribute } from './canRead'
import partyField from '../fields/partyField'
import descriptionField from '../fields/descriptionField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'

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
    ...logcicaRelationshipField({
      name: 'parent',
      relationTo: 'sessions',
      position: 'sidebar',
    }),
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
        ...logcicaRelationshipField({
          name: 'place',
          relationTo: 'places',
        }),
        ...logcicaRelationshipField({
          name: 'catalog',
          relationTo: 'catalogs',
        }),
      ],
    },
    ...logcicaRelationshipField({
      name: 'profiles',
      relationTo: 'profiles',
      hasMany: true,
      nameSingular: 'profile',
    }),
    {
      name: 'subject',
      type: 'group',
      label: getLabelTranslations('subject'),
      fields: [
        ...logcicaRelationshipField({
          name: 'counter',
          relationTo: 'counters',
        }),
      ],
    },
  ],
}

export default Sessions
