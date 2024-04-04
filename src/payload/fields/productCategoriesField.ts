import { Field } from 'payload/types';

const productCategoriesField: Field =
{
  name: 'productCategories',
  type: 'relationship',
  relationTo: 'categories',
  hasMany: true,
  admin: {
    position: 'sidebar',
  },
}

export default productCategoriesField;