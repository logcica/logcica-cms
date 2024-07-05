import type { CollectionConfig } from 'payload/types'
import { cannotConfigure } from './canRead'
import { getCollectionLabelsTranslations } from '../utilities/translate'

const Units: CollectionConfig = {
  slug: 'units',
  labels: getCollectionLabelsTranslations('units'),
  admin: {
    useAsTitle: 'id',
    group: 'Configuration',
    hidden: cannotConfigure
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'symbol',
      type: 'text',
    },
    {
      name: 'key',
      type: 'text',
    }
  ],
}

export default Units
