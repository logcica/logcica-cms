import type { CollectionConfig } from 'payload/types'
import { canManage } from './canRead'
import partyField from '../fields/partyField'
import numberField from '../fields/numberField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'

const Fulfilments: CollectionConfig = {
  slug: 'fulfilments',
  labels: getCollectionLabelsTranslations('fulfilments'),
  admin: {
    useAsTitle: 'number',
    group: 'Transactions',
    defaultColumns: ['number', 'id', 'operator', 'workspace'],
  },
  access: {
    read: canManage({ tenancyInAnyProperty: ['operator'] }),
  },
  fields: [
    {
      type: 'row',
      fields: [
        numberField,
        ...logcicaRelationshipField({
          name: 'orders',
          relationTo: 'orders',
          hasMany: true,
          nameSingular: 'order',
        }),
      ],
    },
    ...partyField({
      name: 'operator',
      position: 'sidebar',
      relations: ['organisations', 'partnerships', 'activities'],
    }),
    {
      type: 'row',
      fields: [
        ...logcicaRelationshipField({
          name: 'workspace',
          relationTo: 'workspaces',
        }),
        ...logcicaRelationshipField({
          name: 'session',
          relationTo: 'sessions',
        }),
      ],
    },
    {
      name: 'lines',
      type: 'array',
      label: getLabelTranslations('lines'),
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'product',
              type: 'relationship',
              label: getLabelTranslations('product'),
              relationTo: 'products',
            },
            {
              name: 'batch',
              type: 'relationship',
              label: getLabelTranslations('batch'),
              relationTo: 'batches',
            },
            {
              name: 'quantity',
              type: 'group',
              label: getLabelTranslations('quantity'),
              fields: [
                {
                  name: 'value',
                  type: 'number',
                  label: getLabelTranslations('value'),
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default Fulfilments
