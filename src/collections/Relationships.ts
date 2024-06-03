import type { CollectionConfig } from 'payload/types'
import { canManage } from './canRead';

const Relationships: CollectionConfig = {
  slug: 'relationships',
  admin: {
    useAsTitle: 'name',
    group: 'Connexions',
    defaultColumns: ['name','id','type','contacts'],
  },
  labels: {
    singular: {
      en: 'Relationship',
      fr: 'Relation',
    },
    plural: {
      en: 'Relationships',
      fr: 'Relations',
    },
  },
  access: {
    read: canManage({tenancyInAnyProperty: ['holder']}),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'type',
      type: 'text',
    },
    {
      name: 'contacts',
      type: 'relationship',
      relationTo: 'contacts',
      hasMany: true
    },
    {
      name: 'holder', // required
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
  ],
}

export default Relationships
