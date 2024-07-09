import { useEffect, useState } from 'react'
import type { CollectionConfig } from 'payload/types'

import allergenListField from '../fields/allergenListField'
import categoriesField from '../fields/CategoriesField'
import descriptionField from '../fields/descriptionField'
import nutrientListField from '../fields/nutrientListField'
import partyField from '../fields/partyField'
import quantityField from '../fields/quantityField'
import { getCollectionLabelsTranslations, getLabelTranslations } from '../utilities/translate'
import { canManageOrContribute } from './canRead'
import uploadImagesField from "../fields/imageField";
import nameField from "../fields/nameField";

const Products: CollectionConfig = {
  slug: 'products',
  labels: getCollectionLabelsTranslations('products'),
  versions: {
    drafts: false,
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Gestion',
    defaultColumns: [
      'name',
      'netWeight',
      'producer',
      'productGroup',
      'ingredientStatement',
      'categories',
    ],
  },
  access: {
    read: canManageOrContribute({
      placeInProperty: 'area',
      tenancyInAnyProperty: ['owner', 'producer'],
    }),
  },
  fields: [
    {
      type: 'row',
      fields: [
        nameField,
        {
          name: 'productGroup',
          type: 'relationship',
          label: getLabelTranslations('productGroup'),
          relationTo: 'product_groups',
        },
      ],
    },
    descriptionField({ name: 'ingredientStatement' }),
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

    quantityField({ name: 'netWeight' }),
    {
      name: 'dimensions',
      type: 'group',
      label: getLabelTranslations('dimensions'),
      fields: [
        {
          type: 'collapsible',
          label: data =>
            [data?.data?.length?.value, data?.data?.width?.value, data?.data?.height?.value]
              .filter(d => d)
              .join(' x '),
          fields: [
            quantityField({ name: 'length' }),
            quantityField({ name: 'width' }),
            quantityField({ name: 'height' }),
            quantityField({ name: 'volume' }),
          ],
        },
      ],
    },
    ...uploadImagesField,
    allergenListField,
    nutrientListField,
    {
      name: 'area',
      type: 'relationship',
      label: getLabelTranslations('area'),
      relationTo: 'places',
      hasMany: false,
    },
  ],
}

export default Products
