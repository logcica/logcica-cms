import type { CollectionConfig } from 'payload/types'

import allergenListField from '../fields/allergenListField'
import categoriesField from '../fields/CategoriesField'
import nutrientListField from '../fields/nutrientListField'
import partyField from '../fields/partyField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import { canManageOrContribute } from './canRead'

const ProductGroup: CollectionConfig = {
  slug: 'product_groups',
  labels: getCollectionLabelsTranslations('product_groups'),
  admin: {
    useAsTitle: 'name',
    group: 'Gestion',
    defaultColumns: ['name', 'producer', 'categories'],
  },
  access: {
    read: canManageOrContribute({
      placeInProperty: 'area',
      tenancyInAnyProperty: ['owner', 'producer'],
    }),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: getLabelTranslations('name'),
      required: true,
    },

    categoriesField,
    ...partyField({
      name: 'producer',
      position: 'sidebar',
      relations: ['organisations', 'partnerships', 'activities'],
    }),
    ...partyField({
      name: 'owner',
      position: 'sidebar',
      relations: ['organisations', 'partnerships'],
    }),

    allergenListField,
    {
      name: 'area',
      type: 'relationship',
      label: getLabelTranslations('area'),
      relationTo: 'places',
      hasMany: false,
    },
  ],
}

export default ProductGroup
