import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead'
import partyField from '../fields/partyField'
import BCEEstablishmentLinkCell from '../fields/BCEEstablishmentLinkCell'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'

const Workspaces: CollectionConfig = {
  slug: 'workspaces',
  labels: getCollectionLabelsTranslations('workspaces'),
  admin: {
    useAsTitle: 'name',
    group: 'Structure',
    defaultColumns: ['name', 'number', 'place', 'manager', 'internalName', 'categories'],
  },
  access: {
    read: canManageOrContribute({ tenancyInAnyProperty: ['manager'] }),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'number',
          type: 'text',
          label: getLabelTranslations('number'),
          admin: {
            components: {
              Cell: BCEEstablishmentLinkCell,
            },
          },
        },
        nameField,
        {
          name: 'internalName',
          type: 'text',
          label: getLabelTranslations('internalName'),
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      label: getLabelTranslations('categories'),
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
      filterOptions: () => {
        return {
          classification: { equals: '663bad09a08a8050428fd1e8' },
        }
      },
    },
    ...partyField({
      name: 'manager',
      position: 'sidebar',
      relations: ['organisations', 'partnerships', 'activities'],
    }),
    ...partyField({
      name: 'owner',
      position: 'sidebar',
      relations: ['organisations', 'partnerships', 'activities'],
    }),
    ...logcicaRelationshipField({
      name: 'place',
      relationTo: 'places',
    }),
  ],
}

export default Workspaces
