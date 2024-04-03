import type { CollectionConfig } from 'payload/types'
import { canManage } from './canRead'

const Activities: CollectionConfig = {
  slug: 'activities',
  labels: {
    singular: {
      en: 'Activity',
      fr: 'Activité',
    },
    plural: {
      en: 'Activities',
      fr: 'Activités',
    },
  },
  admin: {
    useAsTitle: 'name',
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
    },
    {
      name: 'place',
      type: 'relationship',
      relationTo: 'places',
      hasMany: false,
    },
  ],
}

export default Activities
