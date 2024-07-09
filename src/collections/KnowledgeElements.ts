import type { CollectionConfig } from 'payload/types'
import CustomLinkCell from '../fields/CustomLinkCell'
import { cannotConfigure } from './canRead'
import nameField from "../fields/nameField";

const KnowledgeElements: CollectionConfig = {
  slug: 'knowledge_element',
  labels: {
    singular: {
      en: 'Knowledge element',
      fr: 'Élément de connaissances',
    },
    plural: {
      en: 'Knowledge elements',
      fr: 'Éléments de connaissances',
    },
  },
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
        },
      ]
    },
    {
      name: 'link',
      type: 'text',
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
          relationTo: 'knowledge_bases'
        },
        {
          name: 'area',
          type: 'relationship',
          relationTo: 'places',
          hasMany: false,
        },
      ]
    }
  ],
}

export default KnowledgeElements
