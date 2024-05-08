import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead';

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
    read: canManageOrContribute({tenancyInAnyProperty: ['manager']}),
  },
  
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'marketplace',
          type: 'relationship',
          relationTo: 'counters'
        },
        {
          name: 'workspace',
          type: 'relationship',
          relationTo: 'counters'
        },
        {
          name: 'place',
          type: 'relationship',
          relationTo: 'places',
          hasMany: false,
        }
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'catalog',
          type: 'relationship',
          relationTo: 'catalogs'
        },
        {
          name: 'availabilities',
          type: 'relationship',
          relationTo: 'availabilities',
          hasMany: true,
        },
      ]
    },
    {
      name: 'contacts',
      type: 'relationship',
      relationTo: 'contacts',
      hasMany: true,
    },
    {
      name: 'profiles',
      type: 'relationship',
      relationTo: 'profiles',
      hasMany: true,
    },
    {
      name: 'manager', // required
      type: 'group', // required
      interfaceName: 'Party', // optional
      admin: {
        position: 'sidebar'
      },
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
          name: 'activity',
          type: 'relationship',
          relationTo: 'activities',
          hasMany: false,
        }
      ],
    }
  ],
}

export default Counters;