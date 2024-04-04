import type { CollectionConfig } from 'payload/types'
import categoriesField from '../fields/CategoriesField'
import sellerPartyField from '../fields/sellerParty'
import customerPartyField from '../fields/customerParty'
import brokerPartyField from '../fields/broker'
import { canManage } from './canRead';

const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: {
      en: 'Order',
      fr: 'Commande',
    },
    plural: {
      en: 'Orders',
      fr: 'Commandes',
    },
  },
  admin: {
    useAsTitle: 'number',
    group: 'Transactions',
  },
  access: {
    read: canManage({tenancyInAnyProperty: ['seller','customer','broker']}),
  },
  fields: [
    {
      name: 'number',
      type: 'text',
    },
    sellerPartyField,
    customerPartyField,
    brokerPartyField,
    categoriesField,
    {
      name: 'counter',
      type: 'relationship',
      relationTo: 'counters'
    },
    {
      name: 'session',
      type: 'relationship',
      relationTo: 'sessions'
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

export default Orders
