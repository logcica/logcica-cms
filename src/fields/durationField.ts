import type { Field } from 'payload'

import deepMerge from '../utilities/deepMerge'
import { getLabelTranslations } from '../utilities/translate'

type DurationType = (options?: { name?: string; overrides?: Record<string, unknown> }) => Field

const durationField: DurationType = ({ name, overrides = {} } = {}) => {
  if (!name) throw new Error('name is empty')
  const durationResult: Field = {
    name: name,
    type: 'number',
    label: getLabelTranslations(name),
    admin: {
      placeholder: 'Entrez la durée en minute (ex: 30)',
      step: 5,
    },
    min: 5,
    max: 720,
  }

  return deepMerge(durationResult, overrides)
}

export default durationField
