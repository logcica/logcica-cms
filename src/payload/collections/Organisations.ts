import type { CollectionConfig } from 'payload/types'
import CustomImageCell from '../fields/CustomImageCell'

const Organisations: CollectionConfig = {
  slug: 'organisations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ["name", "mainImage", "place"]
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
      name: 'place',
      type: 'relationship',
      relationTo: 'places',
      hasMany: false,
    },
    {
      name: 'mainImage',
      label: "Image",
      type: 'group',
      interfaceName: "Image",
      admin: {
        components: {
          Cell: CustomImageCell
        }
      },
      fields: [
        {
          name:'url',
          type: 'text'
        }
      ]
    },
    {
      name: 'images',
      type: 'array',
      interfaceName: "Images",
      fields: [
        {
          name:'url',
          type: 'text'
        }
      ]
    }
  ],
}

export default Organisations
