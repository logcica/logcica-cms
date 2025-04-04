import type { CollectionConfig } from 'payload'
import { cannotConfigure } from './canRead'
import nameField from '../fields/nameField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'

const Sectors: CollectionConfig = {
  slug: 'sectors',
  labels: getCollectionLabelsTranslations('sectors'),
  admin: {
    useAsTitle: 'name',
    group: 'Structure',
    hidden: cannotConfigure,
    listSearchableFields: ['name', 'within.name'],
    defaultColumns: ['name', 'within'],
  },
  access: {
    read: () => true,
  },
  fields: [
    nameField,
    {
      type: 'relationship',
      name: 'within',
      label: getLabelTranslations('within'),
      relationTo: 'sectors',
      hasMany: true,
    },
  ],
}

export default Sectors
