import type { CollectionConfig } from 'payload/types'
import managerPartyField from '../fields/managerPartyField'
import categoriesField from '../fields/CategoriesField'
import { canManageOrContribute } from './canRead'

const Sessions: CollectionConfig = {
  slug: 'sessions',
  admin: {
    useAsTitle: 'name',
    group: 'Gestion'
  },
  access: {
    read: canManageOrContribute({tenancyInAnyProperty: ['manager']}),
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
      name: 'catalog',
      type: 'relationship',
      relationTo: 'catalogs',
      hasMany: false,
    },
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
