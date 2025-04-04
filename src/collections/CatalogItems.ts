import type { CollectionConfig } from 'payload'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'

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
    {
      type: 'relationship',
      name: 'catalog',
      label: getLabelTranslations('catalog'),
      relationTo: 'catalogs',
    },
    {
      type: 'relationship',
      name: 'product',
      label: getLabelTranslations('product'),
      relationTo: 'products',
    },
  ],
}

export default Catalogs
