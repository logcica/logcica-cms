import type { CollectionConfig } from 'payload'
import { canManageOrContribute } from './canRead'
import partyField from '../fields/partyField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'

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
              Cell: 'src/fields/BCEEstablishmentLinkCell',
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
      type: 'relationship',
      name: 'categories',
      label: getLabelTranslations('categories'),
      relationTo: 'categories',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
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
    {
      type: 'relationship',
      name: 'place',
      label: getLabelTranslations('place'),
      relationTo: 'places',
    },
  ],
}

export default Workspaces
