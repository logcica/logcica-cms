import type { CollectionConfig } from 'payload'
import { canManageOrContribute } from './canRead'
import descriptionField from '../fields/descriptionField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import partyField from '../fields/partyField'
import nameField from '../fields/nameField'

const Catalogs: CollectionConfig = {
  slug: 'catalogs',
  labels: getCollectionLabelsTranslations('catalogs'),
  versions: {
    drafts: false,
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Gestion',
    defaultColumns: ['id', 'type', 'productCategories', 'description', 'name'],
  },
  access: {
    read: canManageOrContribute({ placeInProperty: 'area', tenancyInAnyProperty: ['seller'] }),
  },
  fields: [
    {
      type: 'row',
      fields: [
        nameField,
        {
          name: 'type',
          type: 'text',
          label: getLabelTranslations('type'),
        },
      ],
    },
    descriptionField({}),
    ...partyField({
      name: 'seller',
      position: 'sidebar',
      relations: ['organisations', 'partnerships', 'activities'],
    }),
    {
      type: 'relationship',
      name: 'area',
      label: getLabelTranslations('area'),
      relationTo: 'places',
    },
    {
      type: 'relationship',
      name: 'productCategories',
      label: getLabelTranslations('productCategories'),
      relationTo: 'categories',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
    },
  ],
}

export default Catalogs
