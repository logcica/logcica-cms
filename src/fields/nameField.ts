import { Field } from 'payload'
import { getLabelTranslations } from '../utilities/translate'

const nameField: Field = {
  name: 'name',
  type: 'text',
  label: getLabelTranslations('name'),
}

export default nameField
