import type { CollectionConfig } from 'payload/types'
import { canManage } from './canRead';
import partyField from '../fields/partyField';
import numberField from "../fields/numberField";
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";

const Fulfilments: CollectionConfig = {
  slug: 'fulfilments',
  labels: getCollectionLabelsTranslations('fulfilments'),
  admin: {
    useAsTitle: 'number',
    group: 'Transactions',
    defaultColumns: ['number','id','operator','workspace'],

  },
  access: {
    read: canManage({tenancyInAnyProperty: ['operator']}),
  },
  fields: [
    {
      type: 'row',
      fields: [
        numberField,
        {
          name: 'orders',
          type: 'relationship',
          label: getLabelTranslations('orders'),
          relationTo: 'orders',
          hasMany: true
        },
      ]
    },
    ...partyField({ name: 'operator', position: 'sidebar', relations: ['organisations', 'partnerships', 'activities'] }),
    {
      type: 'row',
      fields: [
        {
          name: 'workspace',
          type: 'relationship',
          label: getLabelTranslations('workspace'),
          relationTo: 'workspaces'
        },
        {
          name: 'session',
          type: 'relationship',
          label: getLabelTranslations('session'),
          relationTo: 'sessions'
        },
      ]
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
              relationTo: 'products'
            },
            {
              name: 'batch',
              type: 'relationship',
              label: getLabelTranslations('batch'),
              relationTo: 'batches'
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
                }
              ]
            },
          ]
        }
      ]
    }
  ],
}

export default Fulfilments
