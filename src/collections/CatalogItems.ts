import type { CollectionConfig } from 'payload/types'
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";
import nameField from "../fields/nameField";

const Catalogs: CollectionConfig = {
  slug: 'catalog_items',
  labels: getCollectionLabelsTranslations('catalog_items'),
  admin: {
    group: 'Gestion',
    defaultColumns: ['id','name','catalog','product'],

  },
  access: {
    read: () => true
  },
  fields: [
    nameField,
    {
      name: 'catalog',
      type: 'relationship',
      label: getLabelTranslations('catalog'),
      relationTo: 'catalogs'
    },
    {
      name: 'product',
      type: 'relationship',
      label: getLabelTranslations('product'),
      relationTo: 'products'
    }
  ],
}

export default Catalogs
