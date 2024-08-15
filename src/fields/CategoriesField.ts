import { Field } from 'payload/types'
import { getLabelTranslations } from '../utilities/translate'
import logcicaRelationshipField from './logcicaRelationshipField'

const categoriesField: Field[] = logcicaRelationshipField({
  name: 'categories',
  relationTo: 'categories',
  position: 'sidebar',
  hasMany: true,
  nameSingular: 'category',
})

export default categoriesField
