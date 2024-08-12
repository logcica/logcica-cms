import type { CollectionConfig } from 'payload/types'
import CustomLinkCell from '../fields/CustomLinkCell'
import { cannotConfigure } from './canRead'
import nameField from '../fields/nameField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import categoriesField from '../fields/CategoriesField'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'

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
          Cell: CustomLinkCell,
        },
      },
    },
    {
      type: 'row',
      fields: [
        ...logcicaRelationshipField({
          name: 'base',
          relationTo: 'knowledge_bases',
        }),
        ...logcicaRelationshipField({
          name: 'area',
          relationTo: 'places',
        }),
      ],
    },
    categoriesField,
  ],
}

export default KnowledgeElements
