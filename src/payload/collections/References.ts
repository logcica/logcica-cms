import type { CollectionConfig } from 'payload/types'
import CustomLinkCell from '../fields/CustomLinkCell'
import { cannotConfigure } from './canRead'

const References: CollectionConfig = {
  slug: 'references',
  labels: {
    singular: {
      en: 'Reference',
      fr: "Référence",
    },
    plural: {
      en: 'References',
      fr: "Références",
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
      name: 'name',
      type: 'text',
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true
    },
    {
      name: 'target',
      type: 'text',
    },
    {
      name: 'targetType',
      type: 'text',
    },
    {
      name: 'targetCollection',
      type: 'text',
    },
    {
      name: 'area',
      type: 'relationship',
      relationTo: 'places',
      hasMany: false,
    },
  ],
}

export default References
