import { Field, RelationshipField } from 'payload/types'

export const partyCommonFields : Field[] = [

  {
    type: 'row',
    fields: [
      {
        name: 'organisation',
        type: 'relationship',
        relationTo: 'organisations',
        hasMany: false,
      },
      {
        name: 'partnership',
        type: 'relationship',
        relationTo: 'partnerships',
        hasMany: false,
      },
      {
        name: 'activity',
        type: 'relationship',
        relationTo: 'activities',
        hasMany: false,
      },
    ],
  },
]


