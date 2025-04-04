import { Field } from 'payload'
import { getLabelTranslations } from '../utilities/translate'

const numberField: Field = {
  name: 'number',
  type: 'text',
  label: getLabelTranslations('number'),
}

export default numberField
