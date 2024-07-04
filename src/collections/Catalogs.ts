import type { CollectionConfig } from 'payload/types'
import categoriesField from '../fields/CategoriesField'
import { useEffect, useState } from 'react'
import ownerPartyField from '../fields/ownerPartyField'
import producerPartyField from '../fields/producerPartyField'
import quantityField from '../fields/quantityField'
import sellerPartyField from '../fields/sellerParty'
import { canManageOrContribute } from './canRead'
import productCategoriesField from '../fields/productCategoriesField'
import { group } from 'console'
import descriptionField from '../fields/descriptionField'
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";


const Catalogs: CollectionConfig = {
  slug: 'catalogs',
  labels: getCollectionLabelsTranslations('catalogs'),
  versions: {
    drafts: false,
    maxPerDoc: 10
  },
  admin: {
    useAsTitle: 'description.short.markdown',
    group: 'Gestion',
    defaultColumns: ['id','type','productCategories','description','name'],
  },
  access: {
    read: canManageOrContribute({placeInProperty: 'area', tenancyInAnyProperty: ['seller']}),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: getLabelTranslations('name'),
    },
    {
      name: 'type',
      type: 'text',
      label: getLabelTranslations('type'),
    },
    descriptionField({name: 'description'}),
    sellerPartyField,
    {
      name: 'area',
      type: 'relationship',
      label: getLabelTranslations('area'),
      relationTo: 'places',
      hasMany: false,
    },
    productCategoriesField
  ],
}

export default Catalogs
