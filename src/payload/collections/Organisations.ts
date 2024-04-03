import type { Access, CollectionConfig } from 'payload/types'
import CustomImageCell from '../fields/CustomImageCell'
import { canManage } from './canRead';

const Organisations: CollectionConfig = {
  slug: 'organisations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ["name", "place"],
    group: 'Structure'
  },
  access: {
    read: canManage({placeInProperty: 'place'}),
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
