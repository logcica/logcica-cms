import type { CollectionConfig } from 'payload/types'
import categoriesField from '../fields/CategoriesField'
import { canManage } from './canRead';
import partyField from '../fields/partyField';
import numberField from "../fields/numberField";
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";

const Subscriptions: CollectionConfig = {
  slug: 'subscriptions',
  labels: getCollectionLabelsTranslations('subscriptions'),
  admin: {
    useAsTitle: 'number',
    group: 'Transactions',
    defaultColumns: ['number','id','status','frequency'],

  },
  access: {
    read: canManage({tenancyInAnyProperty: ['provider','subscriber','broker']}),
  },
  fields: [
    numberField,
    {
      name: 'status',
      type: 'text',
      label: getLabelTranslations('status'),
    },
    {
      name: 'frequency',
      type: 'group',
      label: getLabelTranslations('frequency'),
      fields: [
        {
          name: 'type',
          type: 'text',
          label: getLabelTranslations('type'),
        },
        {
          name: 'interval',
          type: 'number',
          label: getLabelTranslations('interval'),
        }
      ]
    },
    {
      name: 'timeRange',
      type: 'group',
      label: getLabelTranslations('timeRange'),
      fields: [
        {
          name: 'from',
          type: 'date',
          label: getLabelTranslations('from'),
        },
        {
          name: 'to',
          type: 'date',
          label: getLabelTranslations('to'),
        }
      ]
    },
    ...partyField({ name: 'provider', relations: ['organisations', 'partnerships', 'activities'] }),
    ...partyField({ name: 'subscriber', relations: ['organisations', 'partnerships', 'activities'] }),
    ...partyField({ name: 'broker', relations: ['organisations', 'partnerships', 'activities'] }),
    categoriesField,
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
    {
      name: 'note',
      type: 'text',
      label: getLabelTranslations('note'),
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

export default Subscriptions
