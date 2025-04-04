import type { CollectionConfig } from 'payload'
import { cannotConfigure } from './canRead'
import nameField from '../fields/nameField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'

const KnowledgeBases: CollectionConfig = {
  slug: 'knowledge_bases',
  labels: getCollectionLabelsTranslations('knowledge_bases'),
  admin: {
    useAsTitle: 'name',
    group: 'Référencement',
    hidden: cannotConfigure,
  },
  access: {
    read: () => true,
  },
  fields: [
    nameField,
    {
      name: 'type',
      type: 'text',
      label: getLabelTranslations('type'),
    },
    {
      name: 'link',
      type: 'text',
      label: getLabelTranslations('link'),
      admin: {
        components: {
          Cell: 'src/fields/CustomLinkCell',
        },
      },
    },
    {
      type: 'relationship',
      name: 'area',
      label: getLabelTranslations('area'),
      relationTo: 'places',
    },
  ],
}

export default KnowledgeBases
