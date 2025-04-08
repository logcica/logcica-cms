import type { CollectionConfig } from 'payload'
import { canManageOrContribute } from './canRead'
import partyField from '../fields/partyField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import nameField from '../fields/nameField'
import ObjectID from 'bson-objectid'

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
              Cell: 'src/fields/BCELinkCell',
            },
          },
        },
        nameField,
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
              list: { equals: new ObjectID('6613b53f2c29cc450c474e3f').toHexString() },
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
    {
      type: 'relationship',
      name: 'mainActivity',
      label: getLabelTranslations('mainActivity'),
      relationTo: 'activities',
      admin: {
        position: 'sidebar',
      },
    },
    ...partyField({ name: 'owner', position: 'sidebar', relations: ['partnerships', 'persons'] }),
    {
      type: 'relationship',
      name: 'place',
      label: getLabelTranslations('place'),
      relationTo: 'places',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'relationship',
      name: 'workspaces',
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
          Cell: 'src/fields/CustomImageCell',
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
