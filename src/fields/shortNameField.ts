import { Field } from 'payload/types'
import { getLabelTranslations } from '../utilities/translate'

const shortNameField: Field = {
  name: 'shortName',
  type: 'text',
  label: getLabelTranslations('shortName'),
}

export default shortNameField
