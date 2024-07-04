import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead'
import payload from 'payload'
import descriptionField from '../fields/descriptionField'
import partyField from '../fields/partyField'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";

const Activities: CollectionConfig = {
  slug: 'activities',
  labels: getCollectionLabelsTranslations('activities'),
  admin: {
    useAsTitle: 'name',
    group: 'Structure',
    listSearchableFields: ['name'],
    defaultColumns: ['name','place','contacts','categories','manager'],
  },
  access: {
    read: canManageOrContribute({tenancyInAnyProperty: ['manager']}),
  },
  fields: [
    {
      name: 'isMain', // required
      type: 'checkbox', // required
      label: getLabelTranslations('isMain'),
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
          label: getLabelTranslations('name'),
        },
        {
          name: 'internalName',
          type: 'text',
          label: getLabelTranslations('internalName'),
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
          label: getLabelTranslations('place'),
          relationTo: 'places',
          hasMany: false,
        },
      ]
    },
    ...partyField({ name: 'manager', position: 'sidebar', relations: ['organisations', 'partnerships', 'activities'] }),
    {
      name: 'profiles',
      type: 'relationship',
      label: getLabelTranslations('profiles'),
      relationTo: 'profiles',
      hasMany: true,
    },
    {
      name: 'contacts',
      type: 'relationship',
      label: getLabelTranslations('contacts'),
      relationTo: 'contacts',
      hasMany: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      label: getLabelTranslations('categories'),
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
          label: getLabelTranslations('productionCategories'),
          relationTo: 'categories',
          hasMany: true,
        },
        {
          name: 'otherCategories',
          type: 'relationship',
          label: getLabelTranslations('otherCategories'),
          relationTo: 'categories',
          hasMany: true,
        },
      ]
    },
    descriptionField({})
  ],
}

export default Activities
