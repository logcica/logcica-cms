import type { CollectionConfig } from 'payload/types'
import managerPartyField from '../fields/managerPartyField'
import categoriesField from '../fields/CategoriesFields'
import { SlugField } from '@nouance/payload-better-fields-plugin'
import ObjectID from 'bson-objectid'
import { createBreadcrumbsField, createParentField } from "@payloadcms/plugin-nested-docs/fields";
import { slugField } from '../fields/slug'
import { canRead } from './canRead'

const Sessions: CollectionConfig = {
  slug: 'sessions',
  admin: {
    useAsTitle: 'name',
    group: 'Gestion'
  },
  access: {
    read: canRead({tenancyInAnyProperty: ['manager']}),
  },
  fields: [
    {
      name: 'key',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'sessions',
      hasMany: false,
    },
    {
      name: 'timeRange',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'from',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime'
                }
              }
            },
            {
              name: 'to',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime'
                }
              }
            }
          ]
        }
      ]
    },
    {
      name: 'place',
      type: 'relationship',
      relationTo: 'places',
      hasMany: false,
    },
    managerPartyField,
    {
      name: 'subject',
      type: 'group',
      fields: [
        {
          name: 'counter',
          type: 'relationship',
          relationTo: 'counters',
          hasMany: false
        }
      ]
    },
    {
      name: 'profiles',
      type: 'relationship',
      relationTo: 'profiles',
      hasMany: true,
      admin: {
        position: 'sidebar'
      }
    },
    categoriesField,
  ],
}

export default Sessions
