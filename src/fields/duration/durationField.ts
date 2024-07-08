import type { Field } from 'payload/types'

import deepMerge from '../../utilities/deepMerge'
import {DurationPicker} from "./durationPickerComponent";
import { getLabelTranslations } from '../../utilities/translate'

type DurationType = (options?: { name?: string; overrides?: Record<string, unknown> }) => Field

const durationField: DurationType = ({ name, overrides = {} } = {}) => {
  const durationResult: Field = {
    name: name,
    type: 'text',
    label: getLabelTranslations(name),
    admin: {
      components: {
        Field: DurationPicker,
      },
    },
  }

  return deepMerge(durationResult, overrides)
}

export default durationField
