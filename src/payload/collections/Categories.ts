import type { CollectionConfig } from 'payload/types'

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: {
      en: 'Category',
      fr: 'Catégorie',
    },
    plural: {
      en: 'Categories',
      fr: 'Catégories',
    },
  },
  admin: {
    useAsTitle: 'name',
    group: 'Configuration'
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      admin: {
        position: 'sidebar',
        disableBulkEdit: true
      }
    },
    {
      name: 'name',
      type: 'text',
      admin: {
        disableBulkEdit: true
      }
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
