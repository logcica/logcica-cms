import type { CollectionConfig } from 'payload/types';
import { canManageOrContribute } from './canRead';
import partyField from '../fields/partyField';
import categoriesField from '../fields/CategoriesField';
import {getCollectionLabelsTranslations, getLabelTranslations} from "../utilities/translate";


const ProductGroup: CollectionConfig = {
  slug: 'product_groups',
  labels: getCollectionLabelsTranslations('product_groups'),
  admin: {
    useAsTitle: 'name',
    group: 'Gestion',
    defaultColumns: ['name','producer','categories'],
  },
  access: {
    read: canManageOrContribute({placeInProperty: 'area', tenancyInAnyProperty: ['owner','producer']}),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: getLabelTranslations('name'),
      required: true,
    },

    categoriesField,
    ...partyField({ name: 'producer', position: 'sidebar', relations: ['organisations', 'partnerships', 'activities'] }),
    ...partyField({ name: 'owner', position: 'sidebar', relations: ['organisations', 'partnerships'] }),

    {
      name: 'allergenList',
      type: 'array',
      label: getLabelTranslations('allergenList'),
      required: false,
      fields: [
        {
          name: 'allergen',
          type: 'text',
          label: getLabelTranslations('allergen'),
          required: true,
        },
        {
          name: 'level',
          type: 'text',
          label: getLabelTranslations('level'),
          required: true,
        },

      ],
    },
    {
        name: 'area',
        type: 'relationship',
      label: getLabelTranslations('area'),
        relationTo: 'places',
        hasMany: false,
      }

  ],
};

export default ProductGroup;
