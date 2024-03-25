import type { CollectionConfig } from 'payload/types'

const CodeLists: CollectionConfig = {
  slug: 'code_lists',
  admin: {
    useAsTitle: 'key',
    group: 'Configuration'
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

export default CodeLists
