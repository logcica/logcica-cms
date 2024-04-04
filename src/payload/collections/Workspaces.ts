import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead'
import managerPartyField from '../fields/managerPartyField'
import ownerPartyField from '../fields/ownerPartyField'

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
      name: 'key',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
    },
    managerPartyField,
    ownerPartyField,
    {
      name: 'place',
      type: 'relationship',
      relationTo: 'places',
      hasMany: false,
    },
  ],
}

export default Workspaces
