import type { CollectionConfig } from 'payload/types'
import categoriesField from '../fields/CategoriesField'
import { canManage } from './canRead';
import partyField from '../fields/partyField'
import numberField from "../fields/numberField";

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
    defaultColumns: ['number','id','seller','customer','session'],
  },
  access: {
    read: canManage({tenancyInAnyProperty: ['seller','customer','broker']}),
  },
  fields: [
    numberField,

    ...partyField({ name: 'seller', relations: ['organisations', 'partnerships', 'activities'] }),
    ...partyField({ name: 'customer', relations: ['organisations', 'partnerships', 'activities', 'persons'] }),
    categoriesField,
    ...partyField({ name: 'broker', position: 'sidebar', relations: ['organisations', 'partnerships', 'activities'] }),
    {
      type: 'row',
      fields: [
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
      ]
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
