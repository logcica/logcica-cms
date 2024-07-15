import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead';
import partyField from '../fields/partyField';
import categoriesField from '../fields/CategoriesField';
import CustomLinkCell from '../fields/CustomLinkCell';
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";
import nameField from "../fields/nameField";
import descriptionField from '../fields/descriptionField';

const Counters: CollectionConfig = {
  slug: 'counters',
  labels: getCollectionLabelsTranslations('counters'),
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['id','name','type','manager','place','marketplace','catalog'],
    group: 'Structure'
  },
  access: {
    read: canManageOrContribute({tenancyInAnyProperty: ['manager']}),
  },

  fields: [
    {
      name: 'type',
      type: 'text',
      label: getLabelTranslations('type'),
      admin: {
        position: 'sidebar'
      }
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
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'marketplace',
          type: 'relationship',
          label: getLabelTranslations('marketplace'),
          relationTo: 'counters'
        },
        {
          name: 'workspace',
          type: 'relationship',
          label: getLabelTranslations('workspace'),
          relationTo: 'workspaces'
        },
        {
          name: 'place',
          type: 'relationship',
          label: getLabelTranslations('place'),
          relationTo: 'places',
          hasMany: false,
        }
      ]
    },
    descriptionField({ name: 'availabilityStatement' }),
    {
      type: 'row',
      fields: [
        {
          name: 'catalog',
          type: 'relationship',
          label: getLabelTranslations('catalog'),
          relationTo: 'catalogs',
        },
        {
          name: 'availabilities',
          type: 'relationship',
          label: getLabelTranslations('availabilities'),
          relationTo: 'availabilities',
          hasMany: true,
        },
      ]
    },
    {
      name: 'link',
      type: 'text',
      label: getLabelTranslations('link'),
      admin: {
        components: {
          Cell: CustomLinkCell,
        },
      },
    },
    {
      name: 'contacts',
      type: 'relationship',
      label: getLabelTranslations('contacts'),
      relationTo: 'contacts',
      hasMany: true,
    },
    {
      name: 'profiles',
      type: 'relationship',
      label: getLabelTranslations('profiles'),
      relationTo: 'profiles',
      hasMany: true,
    },
    categoriesField,
    ...partyField({ name: 'manager', position: 'sidebar', relations: ['organisations', 'partnerships', 'activities'] })
  ],
}

export default Counters;
