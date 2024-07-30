import type { CollectionConfig } from 'payload/types'
import { cannotConfigure } from './canRead'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'

const Units: CollectionConfig = {
  slug: 'units',
  labels: getCollectionLabelsTranslations('units'),
  admin: {
    useAsTitle: 'id',
    group: 'Configuration',
    hidden: cannotConfigure,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      label: getLabelTranslations('id'),
    },
    nameField,
    {
      name: 'symbol',
      type: 'text',
      label: getLabelTranslations('symbol'),
    },
    {
      name: 'key',
      type: 'text',
      label: getLabelTranslations('key'),
    },
  ],
}

export default Units
