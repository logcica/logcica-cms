import type { CollectionConfig } from 'payload/types'

const Places: CollectionConfig = {
  slug: 'places',
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
      name: 'center',
      type: 'point',
      label: 'Location',
    },
    {
      name: 'within',
      type: 'relationship',
      relationTo: 'places',
      hasMany: true,
    },
    {
      name: 'address', // required
      type: 'group', // required
      interfaceName: 'Address', // optional
      fields: [
        {
          name: 'street',
          type: 'text',
        },
        {
          name: 'locality',
          type: 'text',
        },
        {
          name: 'postalCode',
          type: 'text',
        },
        {
          name: 'country',
          type: 'text',
        }
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
  ],
}

export default Places
