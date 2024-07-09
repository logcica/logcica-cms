import type { CollectionConfig } from 'payload/types'
import CustomLinkCell from '../fields/CustomLinkCell'
import { cannotConfigure } from './canRead'
import nameField from "../fields/nameField";

const InformationSystems: CollectionConfig = {
  slug: 'information_systems',
  labels: {
    singular: {
      en: 'Information system',
      fr: "Système d'information",
    },
    plural: {
      en: 'Information systems',
      fr: "Systèmes d'information",
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
      name: 'key',
      type: 'text',
    },
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

export default InformationSystems
