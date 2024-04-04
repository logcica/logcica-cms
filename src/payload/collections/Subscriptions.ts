import type { CollectionConfig } from 'payload/types'
import categoriesField from '../fields/CategoriesField'
import brokerPartyField from '../fields/broker'
import { canManage } from './canRead';
import providerPartyField from '../fields/providerParty'
import subscriberPartyField from '../fields/subscriberParty'

const Subscriptions: CollectionConfig = {
  slug: 'subscriptions',
  labels: {
    singular: {
      en: 'Subscription',
      fr: 'Abonnement',
    },
    plural: {
      en: 'Subscriptions',
      fr: 'Abonnements',
    },
  },
  admin: {
    useAsTitle: 'number',
    group: 'Transactions',
  },
  access: {
    read: canManage({tenancyInAnyProperty: ['provider','subscriber','broker']}),
  },
  fields: [
    {
      name: 'number',
      type: 'text',
    },
    {
      name: 'status',
      type: 'text'
    },
    {
      name: 'frequency',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'text'
        },
        {
          name: 'interval',
          type: 'number'
        }
      ]
    },
    {
      name: 'timeRange',
      type: 'group',
      fields: [
        {
          name: 'from',
          type: 'date'
        },
        {
          name: 'to',
          type: 'date'
        }
      ]
    },
    providerPartyField,
    subscriberPartyField,
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
      name: 'note',
      type: 'text'
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

export default Subscriptions
