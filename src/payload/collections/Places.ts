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
      name: 'addressText',
      type: 'text',
      admin: {
        hidden: true, // hides the field from the admin panel
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // ensures data is not stored in DB
            delete siblingData['addressText']
          }
        ],
        afterRead: [
          ({ data }) => {  
            const address = data.address
            if(address)
              return [address.street, address.locality, address.municipality].filter(n => n).join(', ')
            return ''
          }
        ],
      },
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
