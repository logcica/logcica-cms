import type { CollectionConfig } from 'payload/types';
import { canManageOrContribute } from './canRead';
import partyField from '../fields/partyField';
import categoriesField from '../fields/CategoriesField';


const ProductGroup: CollectionConfig = {
  slug: 'product_groups',
  labels: {
    singular: {
      en: 'Product group',
      fr: 'Groupe de produits',
    },
    plural: {
      en: 'Product groups',
      fr: 'Groupes de produits',
    },
  },
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
      required: true,
    },
    
    categoriesField,
    ...partyField({ name: 'producer', position: 'sidebar', relations: ['organisations', 'partnerships', 'activities'] }),
    ...partyField({ name: 'owner', position: 'sidebar', relations: ['organisations', 'partnerships'] }),
    
    {
      name: 'allergenList',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'allergen',
          type: 'text',
          required: true,
        },
        {
          name: 'level',
          type: 'text',
          required: true,
        },

      ],
    },
    {
        name: 'area',
        type: 'relationship',
        relationTo: 'places',
        hasMany: false,
      }
    
  ],
};

export default ProductGroup;
