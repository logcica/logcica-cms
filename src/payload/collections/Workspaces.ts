import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead'
import managerPartyField from '../fields/managerPartyField'
import ownerPartyField from '../fields/ownerPartyField'
import partyField from '../fields/partyField'
import BCEEstablishmentLinkCell from '../fields/BCEEstablishmentLinkCell'

const Workspaces: CollectionConfig = {
  slug: 'workspaces',
  labels: {
    singular: {
      en: 'Workspace',
      fr: 'Espace de travail',
    },
    plural: {
      en: 'Workspaces',
      fr: 'Espaces de travail',
    },
  },
  admin: {
    useAsTitle: 'name',
    group: 'Structure'
  },
  access: {
    read: canManageOrContribute({tenancyInAnyProperty: ['manager']}),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'number',
          type: 'text',
          admin: {
            components: {
              Cell: BCEEstablishmentLinkCell,
            },
          },
        },
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'internalName',
          type: 'text',
        },
      ]
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar'
      },
      filterOptions: () => {
        return {
          classification: { equals: '663bad09a08a8050428fd1e8' },
        }
      }
    },
    partyField({ name: 'manager', position: 'sidebar', relations: ['organisations', 'partnerships', 'activities'] }),
    partyField({ name: 'owner', position: 'sidebar', relations: ['organisations', 'partnerships', 'activities'] }),
    {
      name: 'place',
      type: 'relationship',
      relationTo: 'places',
      hasMany: false,
    },
  ],
}

export default Workspaces
