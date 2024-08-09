import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead'
import payload from 'payload'
import descriptionField from '../fields/descriptionField'
import partyField from '../fields/partyField'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'

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
        ...logcicaRelationshipField({
          name: 'mainWorkspace',
          relationTo: 'workspaces',
        }),
        ...logcicaRelationshipField({
          name: 'place',
          relationTo: 'places',
        }),
      ],
    },
    ...partyField({
      name: 'manager',
      position: 'sidebar',
      relations: ['organisations', 'partnerships', 'activities'],
    }),
    ...logcicaRelationshipField({
      name: 'profiles',
      relationTo: 'profiles',
      hasMany: true,
      nameSingular: 'profile',
    }),
    ...logcicaRelationshipField({
      name: 'contacts',
      relationTo: 'contacts',
      hasMany: true,
      nameSingular: 'contact',
    }),
    ...logcicaRelationshipField({
      name: 'categories',
      relationTo: 'categories',
      position: 'sidebar',
      hasMany: true,
      nameSingular: 'category',
    }),
    {
      type: 'row',
      fields: [
        ...logcicaRelationshipField({
          name: 'productionCategories',
          relationTo: 'categories',
          hasMany: true,
          nameSingular: 'productionCategory',
        }),
        ...logcicaRelationshipField({
          name: 'otherCategories',
          relationTo: 'categories',
          hasMany: true,
          nameSingular: 'otherCategory',
        }),
      ],
    },
    descriptionField({}),
  ],
}

export default Activities
