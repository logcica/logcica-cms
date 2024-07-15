import type { Field } from 'payload/types'
import deepMerge from '../utilities/deepMerge'
import CustomPartyCell from './CustomPartyCell'
import { Types } from 'mongoose'
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";

type PartyType = (options?: {
  name?: string
  position?: 'sidebar'
  relations?: string[]
  overrides?: Record<string, unknown>
}) => Field[]

const supportedRelations = [
  {
    singural: 'organisation',
    plural: 'organisations',
  },
  {
    singural: 'partnership',
    plural: 'partnerships',
  },
  {
    singural: 'workspace',
    plural: 'workspaces',
  },
  {
    singural: 'activity',
    plural: 'activities',
  },
  {
    singural: 'person',
    plural: 'persons',
  }
]

export function newForeignKeyField(name: string, localName: string): Field{
  const foreignKeyField: Field = {
   name: name + capitalizeFirstLetter(localName) + 'Id',
   type: 'richText',
   hooks: {
     beforeChange: [
       ({ siblingData }) => {
         if (!siblingData[name][localName]) return siblingData[name][localName]
         return new Types.ObjectId(siblingData[name][localName])
       },
     ],
   },
   admin: {
     hidden: true,
   },
 }

 return foreignKeyField
}

const partyField: PartyType = ({ name, position, relations, overrides = {} } = {}) => {
  const partyResult: Field = {
    name: name,
    type: 'group',
    label: getLabelTranslations(name),
    interfaceName: 'Party',
    fields: [
      {
        type: 'row',
        fields: relations.map(r => {
          const localName = supportedRelations.find(sr => sr.plural == r).singural
          /*const localName = getCollectionLabelsTranslations(r)*/
          const relationTo = supportedRelations.find(sr => sr.plural == r).plural

          const relationshipField: Field = {
            name: localName,
            type: 'relationship',
            label: getLabelTranslations(localName),
            relationTo: relationTo,
          }

          return relationshipField
        }),
      },
    ],
    admin: {
      position: position,
      components: {
        Cell: CustomPartyCell,
      },
    },
  }

  const foreignKeys = relations.map(r => {
    const localName = supportedRelations.find(sr => sr.plural == r).singural

    const foreignKeyField = newForeignKeyField(name, localName)
    return deepMerge(foreignKeyField, overrides)
  })

  return [deepMerge(partyResult, overrides), ...foreignKeys]
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default partyField
