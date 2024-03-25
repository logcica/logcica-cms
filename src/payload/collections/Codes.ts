import type { CollectionConfig } from 'payload/types'

const Codes: CollectionConfig = {
  slug: 'codes',
  admin: {
    useAsTitle: 'name',
    group: 'Configuration'
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'code',
      type: 'text',
    },
    {
      name: 'key',
      type: 'text',
    },
    {
      name: 'list',
      type: 'relationship',
      relationTo: 'code_lists',
      hasMany: false,
    },
  ],
}

export default Codes
