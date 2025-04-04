import { getLabelTranslations } from '../utilities/translate'
import { Field } from 'payload'

const categoriesField: Field[] = [
  {
    type: 'relationship',
    name: 'categories',
    label: getLabelTranslations('categories'),
    relationTo: 'categories',
    // TODO position: 'sidebar',
    hasMany: true,
  },
]

export default categoriesField
