import type { CollectionConfig } from 'payload/types'
import { cannotConfigure } from './canRead'
import nameField from "../fields/nameField";

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
    nameField,
    {
      name: 'code',
      type: 'text',
    },
    {
      name: 'key',
      type: 'text',
    },
    {
      name: 'rank',
      type: 'number',
    },
    {
      name: 'skip',
      type: 'checkbox',
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
