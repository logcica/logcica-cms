import { Field, RelationshipField } from 'payload/types'

const partyCommonFields : Field[] = [

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

export const producerPartyField: Field = {
  name: 'producer',
  type: 'group', // required
  interfaceName: 'Party', // optional
  fields: partyCommonFields
}

export const ownerPartyField: Field = {
  name: 'owner',
  type: 'group', // required
  interfaceName: 'Party', // optional
  fields: partyCommonFields
}


