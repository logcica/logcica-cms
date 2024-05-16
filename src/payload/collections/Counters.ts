import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead';
import partyField from '../fields/partyField';
import categoriesField from '../fields/CategoriesField';
import CustomLinkCell from '../fields/CustomLinkCell';

const Counters: CollectionConfig = {
  slug: 'counters',
  labels: {
    singular: {
      en: 'Counter',
      fr: 'Comptoir',
    },
    plural: {
      en: 'Counters',
      fr: 'Comptoirs',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ["name", "place"],
    group: 'Structure'
  },
  access: {
    read: canManageOrContribute({tenancyInAnyProperty: ['manager']}),
  },
  
  fields: [
    {
      name: 'type',
      type: 'text',
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
        },
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'marketplace',
          type: 'relationship',
          relationTo: 'counters'
        },
        {
          name: 'workspace',
          type: 'relationship',
          relationTo: 'workspaces'
        },
        {
          name: 'place',
          type: 'relationship',
          relationTo: 'places',
          hasMany: false,
        }
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'catalog',
          type: 'relationship',
          relationTo: 'catalogs'
        },
        {
          name: 'availabilities',
          type: 'relationship',
          relationTo: 'availabilities',
          hasMany: true,
        },
      ]
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        components: {
          Cell: CustomLinkCell,
        },
      },
    },
    {
      name: 'contacts',
      type: 'relationship',
      relationTo: 'contacts',
      hasMany: true,
    },
    {
      name: 'profiles',
      type: 'relationship',
      relationTo: 'profiles',
      hasMany: true,
    },
    categoriesField,
    partyField({ name: 'manager', position: 'sidebar', relations: ['organisations', 'partnerships', 'activities'] })
  ],
}

export default Counters;