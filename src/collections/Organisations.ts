import type { CollectionConfig } from 'payload/types'
import CustomImageCell from '../fields/CustomImageCell'
import { canManageOrContribute } from './canRead'
import partyField from '../fields/partyField'
import BCELinkCell from '../fields/BCELinkCell'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'
import {getCollectionLabelsTranslations, getLabelTranslations} from '../utilities/translate'

const Organisations: CollectionConfig = {
  slug: 'organisations',
  labels: getCollectionLabelsTranslations('organisations'),
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'number', 'place', 'legalFormShort'],
    group: 'Structure',
    listSearchableFields: ['name', 'number'],
  },
  access: {
    read: canManageOrContribute({ placeInProperty: 'place' }),
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
              Cell: BCELinkCell,
            },
          },
        },
        {
          name: 'name',
          type: 'text',
          label: getLabelTranslations('name'),
        },
        {
          name: 'legalFormShort',
          type: 'text',
          label: getLabelTranslations('legalFormShort'),
        },
        {
          name: 'legalForm',
          type: 'relationship',
          label: getLabelTranslations('legalForm'),
          relationTo: 'codes',
          /* -> is not sorting alpha. afterwards ...
        admin: {
          sortOptions: 'rank'
        },*/
          filterOptions: () => {
            return {
              list: { equals: '6613b53f2c29cc450c474e3f' },
              skip: { not_equals: true },
            }
          },
        },
      ],
    },
    {
      name: 'registeredAt',
      type: 'date',
      label: getLabelTranslations('registeredAt'),
    },
    ...logcicaRelationshipField({
      name: 'mainActivity',
      relationTo: 'activities',
      position: 'sidebar',
    }),
    ...partyField({ name: 'owner', position: 'sidebar', relations: ['partnerships', 'persons'] }),
    ...logcicaRelationshipField({
      name: 'place',
      relationTo: 'places',
      position: 'sidebar',
    }),
    {
      name: 'workspaces',
      type: 'relationship',
      label: getLabelTranslations('workspaces'),
      relationTo: 'workspaces',
      hasMany: true,
    },
    {
      name: 'mainImage',
      label: getLabelTranslations('images'),
      type: 'group',
      interfaceName: 'Image',
      admin: {
        components: {
          Cell: CustomImageCell,
        },
      },
      fields: [
        {
          name: 'url',
          label: getLabelTranslations('url'),
          type: 'text',
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: getLabelTranslations('images'),
      interfaceName: 'Images',
      fields: [
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
}

export default Organisations
