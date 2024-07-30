import type { CollectionConfig } from 'payload/types'
import { cannotConfigure } from './canRead'
import nameField from "../fields/nameField";
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";

const Classifications: CollectionConfig = {
  slug: 'classifications',
  labels: getCollectionLabelsTranslations('classifications'),
  admin: {
    useAsTitle: 'name',
    group: 'Configuration',
    hidden: cannotConfigure
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      label: getLabelTranslations('key'),
    },
    nameField,
    {
      name: 'system',
      type: 'relationship',
      label: getLabelTranslations('system'),
      relationTo: 'information_systems',
      hasMany: false,
    }
  ],
}

export default Classifications
