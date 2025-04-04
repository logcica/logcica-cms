import type { CollectionConfig } from 'payload'
import { cannotConfigure } from './canRead'
import nameField from '../fields/nameField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import categoriesField from '../fields/CategoriesField'

const KnowledgeElements: CollectionConfig = {
  slug: 'knowledge_element',
  labels: getCollectionLabelsTranslations('knowledge_element'),
  admin: {
    useAsTitle: 'name',
    group: 'Référencement',
    hidden: cannotConfigure,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        nameField,
        {
          name: 'type',
          type: 'text',
          label: getLabelTranslations('type'),
        },
      ],
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
      type: 'row',
      fields: [
        {
          type: 'relationship',
          name: 'base',
          label: getLabelTranslations('base'),
          relationTo: 'knowledge_bases',
        },
        {
          type: 'relationship',
          name: 'area',
          label: getLabelTranslations('area'),
          relationTo: 'places',
        },
      ],
    },
    ...categoriesField,
  ],
}

export default KnowledgeElements
