import { Field } from 'payload'
import { getLabelTranslations } from '../utilities/translate'

const shortNameField: Field = {
  name: 'shortName',
  type: 'text',
  label: getLabelTranslations('shortName'),
}

export default shortNameField
