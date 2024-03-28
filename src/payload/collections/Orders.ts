import type { CollectionConfig } from 'payload/types'
import categoriesField from '../fields/CategoriesFields'
import { useEffect, useState } from 'react'
import ownerPartyField from '../fields/ownerPartyField'
import producerPartyField from '../fields/producerPartyField'
import quantityField from '../fields/quantityField'
import sellerPartyField from '../fields/sellerParty'
import customerPartyField from '../fields/customerParty'
import brokerPartyField from '../fields/broker'

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
    group: 'Gestion',
  },
  access: {
    read: () => true,
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
