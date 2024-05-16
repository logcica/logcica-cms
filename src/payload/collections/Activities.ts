import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead'
import payload from 'payload'
import descriptionField from '../fields/descriptionField'
import partyField from '../fields/partyField'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'

const Activities: CollectionConfig = {
  slug: 'activities',
  labels: {
    singular: {
      en: 'Activity',
      fr: 'Activité',
    },
    plural: {
      en: 'Activities',
      fr: 'Activités',
    },
  },
  admin: {
    useAsTitle: 'name',
    group: 'Structure',
    listSearchableFields: ['name']
  },
  access: {
    read: canManageOrContribute({tenancyInAnyProperty: ['manager']}),
  },
  fields: [
    {
      name: 'isMain', // required
      type: 'checkbox', // required
      defaultValue: false,
      admin: {
        position: 'sidebar'
      }
    },
    {
      type: 'row',
      fields: [

        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'internalName',
          type: 'text',
        }
      ]
    },
    {
      type: 'row', 
      fields: [
        ...logcicaRelationshipField({
          name: 'mainWorkspace',
          relationTo: 'workspaces',
        }),
        {
          name: 'place',
          type: 'relationship',
          relationTo: 'places',
          hasMany: false,
        },
      ]
    },
    ...partyField({ name: 'manager', position: 'sidebar', relations: ['organisations', 'partnerships', 'activities'] }),
    {
      name: 'profiles',
      type: 'relationship',
      relationTo: 'profiles',
      hasMany: true,
    },
    {
      name: 'contacts',
      type: 'relationship',
      relationTo: 'contacts',
      hasMany: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar'
      }
    },
    {
      type: 'row',
      fields: [
        {
          name: 'productionCategories',
          type: 'relationship',
          relationTo: 'categories',
          hasMany: true,
        },
        {
          name: 'otherCategories',
          type: 'relationship',
          relationTo: 'categories',
          hasMany: true,
        },
      ]
    },
    descriptionField({})
  ],
}

export default Activities
