import type { CollectionConfig } from 'payload/types'
import managerPartyField from '../fields/managerPartyField'
import categoriesField from '../fields/CategoriesField'
import { canManageOrContribute } from './canRead'
import partyField from '../fields/partyField'
import descriptionField from '../fields/descriptionField'

const Sessions: CollectionConfig = {
  slug: 'sessions',
  admin: {
    useAsTitle: 'name',
    group: 'Gestion',
    defaultColumns: ['name','place','manager','parent','categories','timeRange'],
  },
  access: {
    read: canManageOrContribute({tenancyInAnyProperty: ['manager']}),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'sessions',
      hasMany: false,
      admin: {
        position: 'sidebar'
      }
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
    descriptionField({}),
    categoriesField,
    ...partyField({ name: 'manager', position: 'sidebar', relations: ['organisations', 'partnerships', 'activities'] }),
    {
      type: 'row',
      fields: [
        {
          name: 'place',
          type: 'relationship',
          relationTo: 'places',
          hasMany: false,
        },
        {
          name: 'catalog',
          type: 'relationship',
          relationTo: 'catalogs',
          hasMany: false,
        },
      ]
    },
    {
      name: 'profiles',
      type: 'relationship',
      relationTo: 'profiles',
      hasMany: true,
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
  ],
}

export default Sessions
