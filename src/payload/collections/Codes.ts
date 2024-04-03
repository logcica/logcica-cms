import type { CollectionConfig } from 'payload/types'
import { cannotConfigure } from './canRead'

const Codes: CollectionConfig = {
  slug: 'codes',
  admin: {
    useAsTitle: 'name',
    group: 'Configuration',
    hidden: cannotConfigure
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
    },
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
