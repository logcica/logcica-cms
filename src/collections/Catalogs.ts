import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead'
import productCategoriesField from '../fields/productCategoriesField'
import descriptionField from '../fields/descriptionField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import partyField from '../fields/partyField'
import nameField from '../fields/nameField'
import logcicaRelationshipField from '../fields/logcicaRelationshipField'

const Catalogs: CollectionConfig = {
  slug: 'catalogs',
  labels: getCollectionLabelsTranslations('catalogs'),
  versions: {
    drafts: false,
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'description.short.markdown',
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
    ...logcicaRelationshipField({
      name: 'area',
      relationTo: 'places',
    }),
    ...logcicaRelationshipField({
      name: 'productCategories',
      relationTo: 'categories',
      position: 'sidebar',
      hasMany: true,
      nameSingular: 'productCategory',
    }),
  ],
}

export default Catalogs
