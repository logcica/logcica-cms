import type { CollectionConfig } from 'payload/types'
import categoriesField from '../fields/CategoriesField'
import { canManage } from './canRead';
import partyField from '../fields/partyField'
import numberField from "../fields/numberField";
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";

const Orders: CollectionConfig = {
  slug: 'orders',
  labels: getCollectionLabelsTranslations('orders'),
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
          label: getLabelTranslations('counter'),
          relationTo: 'counters'
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
              relationTo: 'products',
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

export default Orders
