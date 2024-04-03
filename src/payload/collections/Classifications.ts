import type { CollectionConfig } from 'payload/types'
import { cannotConfigure } from './canRead'

const Classifications: CollectionConfig = {
  slug: 'classifications',
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
      name: 'key',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
    },
  ],
}

export default Classifications
