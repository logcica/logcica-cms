import type { CollectionConfig } from 'payload/types'
import CustomLinkCell from '../fields/CustomLinkCell'
import { cannotConfigure } from './canRead'
import nameField from "../fields/nameField";

const KnowledgeBases: CollectionConfig = {
  slug: 'knowledge_bases',
  labels: {
    singular: {
      en: 'Knowledge base',
      fr: 'Base de connaissances',
    },
    plural: {
      en: 'Knowledge bases',
      fr: 'Bases de connaissances',
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
    nameField,
    {
      name: 'type',
      type: 'text',
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
      name: 'area',
      type: 'relationship',
      relationTo: 'places',
      hasMany: false,
    },
  ],
}

export default KnowledgeBases
