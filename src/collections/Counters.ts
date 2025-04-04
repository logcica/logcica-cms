import type { CollectionConfig } from 'payload'
import { canManageOrContribute } from './canRead'
import partyField from '../fields/partyField'
import categoriesField from '../fields/CategoriesField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'
import descriptionField from '../fields/descriptionField'
import uploadImagesField from '../fields/imageField'

const Counters: CollectionConfig = {
  slug: 'counters',
  labels: getCollectionLabelsTranslations('counters'),
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['id', 'name', 'type', 'manager', 'place', 'marketplace', 'catalog'],
    group: 'Structure',
  },
  access: {
    read: canManageOrContribute({ tenancyInAnyProperty: ['manager'] }),
  },

  fields: [
    {
      name: 'type',
      type: 'text',
      label: getLabelTranslations('type'),
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'relationship',
      name: 'sectors',
      label: getLabelTranslations('sectors'),
      relationTo: 'sectors',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      fields: [
        nameField,
        {
          name: 'internalName',
          type: 'text',
          label: getLabelTranslations('internalName'),
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          type: 'relationship',
          name: 'marketplace',
          label: getLabelTranslations('marketplace'),
          relationTo: 'counters',
        },
        {
          type: 'relationship',
          name: 'workspaces',
          label: getLabelTranslations('workspaces'),
          relationTo: 'workspaces',
        },
        {
          type: 'relationship',
          name: 'place',
          label: getLabelTranslations('place'),
          relationTo: 'places',
        },
      ],
    },
    descriptionField({ name: 'availabilityStatement', fields: ['short'] }),
    {
      type: 'row',
      fields: [
        {
          type: 'relationship',
          name: 'catalog',
          label: getLabelTranslations('catalog'),
          relationTo: 'catalogs',
        },
        {
          type: 'relationship',
          name: 'availabilities',
          label: getLabelTranslations('availabilities'),
          relationTo: 'availabilities',
          hasMany: true,
        },
      ],
    },
    {
      name: 'link',
      type: 'text',
      label: getLabelTranslations('link'),
      admin: {
        components: {
          Cell: 'src/fields/CustomLinkCell',
        },
      },
    },
    {
      type: 'relationship',
      name: 'contacts',
      label: getLabelTranslations('contacts'),
      relationTo: 'contacts',
      hasMany: true,
    },
    {
      type: 'relationship',
      name: 'profiles',
      label: getLabelTranslations('profiles'),
      relationTo: 'profiles',
      hasMany: true,
    },
    ...categoriesField,
    ...partyField({
      name: 'manager',
      position: 'sidebar',
      relations: ['organisations', 'partnerships', 'activities'],
    }),

    ...uploadImagesField,
  ],
}

export default Counters
