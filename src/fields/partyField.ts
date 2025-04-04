import type { CollectionSlug, Field } from 'payload'
import { getLabelTranslations } from '../utilities/translate'

type PartyType = (options?: {
  name?: string
  position?: 'sidebar'
  relations?: string[]
  overrides?: Record<string, unknown>
}) => Field[]

type SupportedRelations = {
  singural: string
  plural: string
}

const supportedRelations: SupportedRelations[] = [
  {
    singural: 'organisation',
    plural: 'organisations',
  },
  {
    singural: 'partnership',
    plural: 'partnerships',
  },
  {
    singural: 'activity',
    plural: 'activities',
  },
  {
    singural: 'workspace',
    plural: 'workspaces',
  },
  {
    singural: 'person',
    plural: 'persons',
  },
  {
    singural: 'profile',
    plural: 'profiles',
  },
]

const partyField: PartyType = ({ name, position, relations, overrides = {} } = {}) => {
  if (!name) throw new Error('name is empty')
  if (!relations) throw new Error('relations is empty')
  const partyResult: Field = {
    name: name,
    type: 'group',
    label: getLabelTranslations(name),
    interfaceName: 'Party',
    fields: [
      {
        type: 'row',
        fields: relations.map((r) => {
          const localName = supportedRelations.find((sr) => sr.plural == r)?.singural
          /*const localName = getCollectionLabelsTranslations(r)*/
          const relationTo = supportedRelations.find((sr) => sr.plural == r)?.plural

          if (!localName) throw new Error('localName is empty')
          if (!relationTo) throw new Error('relationTo is empty')

          const relationshipField: Field = {
            name: localName,
            type: 'relationship',
            label: getLabelTranslations(localName),
            relationTo: relationTo as CollectionSlug,
          }

          return relationshipField
        }),
      },
    ],
    admin: {
      position: position,
      components: {
        Cell: 'src/fields/CustomPartyCell',
      },
    },
  }

  return [partyResult]
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default partyField
