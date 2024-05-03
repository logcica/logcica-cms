import type { Access, CollectionConfig } from 'payload/types'
import CustomImageCell from '../fields/CustomImageCell'
import { canManageOrContribute } from './canRead'
import ownerPartyField from '../fields/ownerPartyField'
import partyField from '../fields/partyField'
import BCELinkCell from '../fields/BCELinkCell'

const Organisations: CollectionConfig = {
  slug: 'organisations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'place'],
    group: 'Structure',
    listSearchableFields: ['name', 'number', 'place.name'],
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
          admin: {
            components: {
              Cell: BCELinkCell,
            },
          },
        },
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'legalFormShort',
          type: 'text',
        },
        {
          name: 'legalForm',
          type: 'relationship',
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
    },
    partyField({ name: 'owner', relations: ['partnerships', 'persons'] }),
    {
      name: 'place',
      type: 'relationship',
      relationTo: 'places',
      hasMany: false,
    },
    {
      name: 'mainImage',
      label: 'Image',
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
          type: 'text',
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
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
