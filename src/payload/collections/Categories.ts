import type { CollectionConfig } from 'payload/types'

const Categories: CollectionConfig = {
  slug: 'categories',
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
      name: 'subject',
      type: 'text',
    },
    {
      name: 'classification',
      type: 'relationship',
      relationTo: 'classifications',
      hasMany: false,
    }
  ],
}

export default Categories
