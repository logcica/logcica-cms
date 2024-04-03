import type { CollectionConfig } from 'payload/types'
import { canManage } from './canRead';

const Counters: CollectionConfig = {
  slug: 'counters',
  labels: {
    singular: {
      en: 'Counter',
      fr: 'Comptoir',
    },
    plural: {
      en: 'Counters',
      fr: 'Comptoirs',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ["name", "place"],
    group: 'Structure'
  },
  access: {
    read: canManage({tenancyInAnyProperty: ['manager']}),
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
      name: 'marketplace',
      type: 'relationship',
      relationTo: 'counters'
    },
    {
      name: 'place',
      type: 'relationship',
      relationTo: 'places',
      hasMany: false,
    },
    {
      name: 'availabilities',
      type: 'relationship',
      relationTo: 'availabilities',
      hasMany: true,
    },
    {
      name: 'manager', // required
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
        }
      ],
    }
  ],
}

export default Counters;