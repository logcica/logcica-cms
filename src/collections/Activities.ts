import type { CollectionConfig } from 'payload'
import { canManageOrContribute } from './canRead'
import descriptionField from '../fields/descriptionField'
import partyField from '../fields/partyField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'
import uploadImagesField from '../fields/imageField'

const Activities: CollectionConfig = {
  slug: 'activities',
  labels: getCollectionLabelsTranslations('activities'),
  admin: {
    useAsTitle: 'name',
    group: 'Structure',
    listSearchableFields: ['name'],
    defaultColumns: ['name', 'place', 'contacts', 'categories', 'manager'],
  },
  access: {
    read: canManageOrContribute({ tenancyInAnyProperty: ['manager'] }),
  },
  fields: [
    {
      name: 'isMain', // required
      type: 'checkbox', // required
      label: getLabelTranslations('isMain_female'),
      defaultValue: false,
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
          name: 'mainWorkspace',
          label: getLabelTranslations('mainWorkspace'),
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

    ...partyField({
      name: 'manager',
      position: 'sidebar',
      relations: ['organisations', 'partnerships', 'activities'],
    }),
    {
      type: 'relationship',
      name: 'profiles',
      label: getLabelTranslations('profiles'),
      relationTo: 'profiles',
      hasMany: true,
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
      name: 'categories',
      label: getLabelTranslations('categories'),
      relationTo: 'categories',
      hasMany: true,
    },
    {
      type: 'row',
      fields: [
        {
          type: 'relationship',
          name: 'productionCategories',
          label: getLabelTranslations('productionCategories'),
          relationTo: 'categories',
          hasMany: true,
        },
        {
          type: 'relationship',
          name: 'otherCategories',
          label: getLabelTranslations('otherCategories'),
          relationTo: 'categories',
          hasMany: true,
        },
      ],
    },
    descriptionField({}),
    ...uploadImagesField,
    {
      name: 'mainVideo',
      type: 'upload',
      relationTo: 'media', // required
      filterOptions: {
        mimeType: { contains: 'video' },
      },
    },
  ],
}

export default Activities
