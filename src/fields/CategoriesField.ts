import { Field } from 'payload/types';

const categoriesField: Field =
{
  name: 'categories',
  type: 'relationship',
  relationTo: 'categories',
  hasMany: true,
  admin: {
    position: 'sidebar',
  },
}

export default categoriesField;