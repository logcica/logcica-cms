import type { CollectionConfig } from 'payload/types'
import { cannotConfigure } from './canRead'
import nameField from "../fields/nameField";

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
    nameField,
  ],
}

export default Classifications
