import { Field } from 'payload/types'
import { getLabelTranslations } from '../utilities/translate'

const categoriesField: Field = {
  name: 'categories',
  type: 'relationship',
  relationTo: 'categories',
  label: getLabelTranslations('categories'),
  hasMany: true,
  admin: {
    position: 'sidebar',
  },
}

export default categoriesField
