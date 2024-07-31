import { Field } from 'payload/types'
import { getLabelTranslations } from '../utilities/translate'

const productCategoriesField: Field = {
  name: 'productCategories',
  type: 'relationship',
  label: getLabelTranslations('productCategories'),
  relationTo: 'categories',
  hasMany: true,
  admin: {
    position: 'sidebar',
  },
}

export default productCategoriesField
