import type { CollectionConfig } from 'payload/types'
import { canManage } from './canRead';
import partyField from '../fields/partyField';
import numberField from "../fields/numberField";

const Fulfilments: CollectionConfig = {
  slug: 'fulfilments',
  labels: {
    singular: {
      en: 'Fulfilment',
      fr: 'Préparation',
    },
    plural: {
      en: 'Fulfilments',
      fr: 'Préparations',
    },
  },
  admin: {
    useAsTitle: 'number',
    group: 'Transactions',
    defaultColumns: ['number','id','operator','workspace'],

  },
  access: {
    read: canManage({tenancyInAnyProperty: ['operator']}),
  },
  fields: [
    numberField,
    ...partyField({ name: 'operator', relations: ['organisations', 'partnerships', 'activities'] }),
    {
      name: 'workspace',
      type: 'relationship',
      relationTo: 'workspaces'
    },
    {
      name: 'session',
      type: 'relationship',
      relationTo: 'sessions'
    },
    {
      name: 'orders',
      type: 'relationship',
      relationTo: 'orders',
      hasMany: true
    },
    {
      name: 'lines',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products'
            },
            {
              name: 'batch',
              type: 'relationship',
              relationTo: 'batches'
            },
            {
              name: 'quantity',
              type: 'group',
              fields: [
                {
                  name: 'value',
                  type: 'number'
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
