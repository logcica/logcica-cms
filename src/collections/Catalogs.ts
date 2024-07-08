import type { CollectionConfig } from 'payload/types'
import { canManageOrContribute } from './canRead'
import productCategoriesField from '../fields/productCategoriesField'
import descriptionField from '../fields/descriptionField'
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";
import partyField from '../fields/partyField'
import nameField from "../fields/nameField";


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
    nameField,
    {
      name: 'type',
      type: 'text',
      label: getLabelTranslations('type'),
    },
    descriptionField({name: 'description'}),
    ...partyField({
      name: 'selller',
      position: 'sidebar',
      relations: ['organisations', 'partnerships', 'activities'],
    }),
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
