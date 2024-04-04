import type { CollectionConfig } from 'payload/types'
import categoriesField from '../fields/CategoriesField'
import sellerPartyField from '../fields/sellerParty'
import customerPartyField from '../fields/customerParty'
import brokerPartyField from '../fields/broker'
import { canManage } from './canRead';
import operatorPartyField from '../fields/operatorParty'

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
  },
  access: {
    read: canManage({tenancyInAnyProperty: ['operator']}),
  },
  fields: [
    {
      name: 'number',
      type: 'text',
    },
    operatorPartyField,
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
