import type { CollectionConfig } from 'payload/types'
import { cannotConfigure } from './canRead'
import nameField from '../fields/nameField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'

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
    ...logcicaRelationshipField({
      name: 'within',
      nameSingular: 'within',
      relationTo: 'sectors',
      hasMany: true,
    }),
  ],
}

export default Sectors
