import type { CollectionConfig } from 'payload/types'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'

const Catalogs: CollectionConfig = {
  slug: 'catalog_items',
  labels: getCollectionLabelsTranslations('catalog_items'),
  admin: {
    group: 'Gestion',
    defaultColumns: ['id', 'name', 'catalog', 'product'],
  },
  access: {
    read: () => true,
  },
  fields: [
    nameField,
    ...logcicaRelationshipField({
      name: 'catalog',
      relationTo: 'catalogs',
    }),
    ...logcicaRelationshipField({
      name: 'product',
      relationTo: 'products',
    }),
  ],
}

export default Catalogs
