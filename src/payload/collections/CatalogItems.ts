import type { CollectionConfig } from 'payload/types'
import sellerPartyField from '../fields/sellerParty'
import { canManageOrContribute } from './canRead'
import productCategoriesField from '../fields/productCategoriesField'


const Catalogs: CollectionConfig = {
  slug: 'catalog_items',
  labels: {
    singular: {
      en: 'Item',
      fr: 'Article',
    },
    plural: {
      en: 'Items',
      fr: 'Articles',
    },
  },
  admin: {
    group: 'Gestion',
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'catalog',
      type: 'relationship',
      relationTo: 'catalogs'
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products'
    }
  ],
}

export default Catalogs
