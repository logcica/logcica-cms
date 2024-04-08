import type { CollectionConfig } from 'payload/types'
import CustomLinkCell from '../fields/CustomLinkCell'
import { canManage } from './canRead'

const Actions: CollectionConfig = {
  slug: 'actions',
  admin: {
    useAsTitle: 'key',
    group: 'Connexions'
  },
  access: {
    read: canManage({tenancyInAnyProperty: ['subject']}) 
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
      name: 'type',
      type: 'text',
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        components: {
          Cell: CustomLinkCell,
        },
      },
    },
    {
      name: 'subject', // required
      type: 'group', // required
      interfaceName: 'Party', // optional
      fields: [
        {
          name: 'organisation',
          type: 'relationship',
          relationTo: 'organisations',
          hasMany: false,
        },
        {
          name: 'partnership',
          type: 'relationship',
          relationTo: 'partnerships',
          hasMany: false,
        },
        {
          name: 'counter',
          type: 'relationship',
          relationTo: 'counters',
          hasMany: false,
        }
      ],
    }
  ],
}

export default Actions
