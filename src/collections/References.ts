import type { CollectionConfig } from 'payload/types'
import CustomLinkCell from '../fields/CustomLinkCell'
import { cannotConfigure } from './canRead'
import partyField from '../fields/partyField'
import nameField from "../fields/nameField";

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
    nameField,
    {
      name: 'tags',
      type: 'text',
      hasMany: true
    },
    {
      name: 'target',
      type: 'text',
    },
    ...partyField({ name: 'holder', position: 'sidebar', relations: ['organisations', 'partnerships', 'persons'] }),
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
