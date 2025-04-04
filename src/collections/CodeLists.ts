import type { CollectionConfig } from 'payload'
import { cannotConfigure } from './canRead'
import nameField from '../fields/nameField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'

const CodeLists: CollectionConfig = {
  slug: 'code_lists',
  labels: getCollectionLabelsTranslations('code_lists'),
  admin: {
    useAsTitle: 'key',
    group: 'Configuration',
    hidden: cannotConfigure,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      label: getLabelTranslations('key'),
    },
    nameField,
  ],
}

export default CodeLists
