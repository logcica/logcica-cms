import { Field, RelationshipField } from 'payload'
import { getLabelTranslations } from '../utilities/translate'

export const partyCommonFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'organisation',
        type: 'relationship',
        label: getLabelTranslations('organisation'),
        relationTo: 'organisations',
        hasMany: false,
      },
      {
        name: 'partnership',
        type: 'relationship',
        label: getLabelTranslations('partnership'),
        relationTo: 'partnerships',
        hasMany: false,
      },
      {
        name: 'activity',
        type: 'relationship',
        label: getLabelTranslations('activity'),
        relationTo: 'activities',
        hasMany: false,
      },
    ],
  },
]
