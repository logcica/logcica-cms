import type { CollectionConfig } from 'payload/types'
import { cannotConfigure } from './canRead'
import nameField from "../fields/nameField";

const CodeLists: CollectionConfig = {
  slug: 'code_lists',
  labels: {
    singular: {
      en: 'Code list',
      fr: 'Liste de codes',
    },
    plural: {
      en: 'Code lists',
      fr: 'Listes de codes',
    },
  },
  admin: {
    useAsTitle: 'key',
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

export default CodeLists
