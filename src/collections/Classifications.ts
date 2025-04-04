import type { CollectionConfig } from 'payload'
import { cannotConfigure } from './canRead'
import nameField from '../fields/nameField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'

const Classifications: CollectionConfig = {
  slug: 'classifications',
  labels: getCollectionLabelsTranslations('classifications'),
  admin: {
    useAsTitle: 'name',
    group: 'Configuration',
    hidden: cannotConfigure,
    defaultColumns: ['name', 'key', 'system', 'subject'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'key',
          type: 'text',
          label: getLabelTranslations('key'),
        },
        nameField,
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'subject',
          type: 'text',
          label: getLabelTranslations('subject'),
        },
        {
          type: 'relationship',
          name: 'system',
          label: getLabelTranslations('system'),
          relationTo: 'information_systems',
        },
      ],
    },
  ],
}

export default Classifications
