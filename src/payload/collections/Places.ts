import type { CollectionConfig } from 'payload/types'

const Places: CollectionConfig = {
  slug: 'places',
  labels: {
    singular: {
      en: 'Place',
      fr: 'Emplacement',
    },
    plural: {
      en: 'Places',
      fr: 'Emplacements',
    },
  },
  admin: {
    useAsTitle: 'title',
    group: 'Structure',
    listSearchableFields: ['name', 'address.street', 'address.locality', 'address.postalCode', 'address.municipality']
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      admin: {
        position: 'sidebar'
      }
    },
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'type',
          type: 'select',
          options: [
            {
              label: 'Adresse',
              value: 'address',
            },
            {
              label: 'Localité',
              value: 'locality',
            },
            {
              label: 'Commune',
              value: 'municipality',
            },
            {
              label: 'Région',
              value: 'region',
            },
            {
              label: 'Pays',
              value: 'country',
            },
          ]
        }
      ]
    },
    {
      name: 'center',
      type: 'point',
    },
    {
      name: 'within',
      type: 'relationship',
      relationTo: 'places',
      hasMany: true,
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        hidden: true
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            delete siblingData['title']
          }
        ],
        afterRead: [
          ({ data }) => {  
            const address = data.address

            if(data.type && data.type != 'address')
              return data.name
              
            const localityParts = [address?.postalCode,(address?.locality ?? address?.municipality)]  
            const list = [address?.street, localityParts.filter(n => n).join(' ')]
            
            if(!address?.street)
              list.unshift(data.name)

            if(list.every(n => !n))
              return data.center

            return list.filter(n => n).join(', ')
          }
        ],
      },
    },
    /*
    {
      label: ({ data }) => data?.title || 'Untitled',
      type: 'collapsible', // required
      admin: {
        position: 'sidebar'
      },
      fields: [
        // required
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'someTextField',
          type: 'text',
          required: true,
        },
      ],
    },
    */
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
          type: 'row',
          fields: [
            {
              name: 'postalCode',
              type: 'text',
            },
            {
              name: 'locality',
              type: 'text',
            },
            {
              name: 'municipality',
              type: 'text',
            },
            {
              name: 'country',
              type: 'text',
            }
          ]
        }
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar'
      }
    },
  ],
}

export default Places
