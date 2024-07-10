import type { CollectionConfig } from 'payload/types'
import CustomLinkCell from '../fields/CustomLinkCell'
import { cannotConfigure } from './canRead'
import nameField from "../fields/nameField";
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";

const KnowledgeElements: CollectionConfig = {
  slug: 'knowledge_element',
  labels: getCollectionLabelsTranslations('knowledge_element'),
  admin: {
    useAsTitle: 'name',
    group: 'Référencement',
    hidden: cannotConfigure
  },
  access: {
    read: () => true
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
      ]
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
        {
          name: 'base',
          type: 'relationship',
          label: getLabelTranslations('base'),
          relationTo: 'knowledge_bases'
        },
        {
          name: 'area',
          type: 'relationship',
          label: getLabelTranslations('area'),
          relationTo: 'places',
          hasMany: false,
        },
      ]
    }
  ],
}

export default KnowledgeElements
