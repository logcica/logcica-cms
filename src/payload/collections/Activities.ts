import type { CollectionConfig } from 'payload/types'

const Activities: CollectionConfig = {
  slug: 'activities',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
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
    }
  ],
}

export default Activities
