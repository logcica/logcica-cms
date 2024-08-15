import { Field } from 'payload/types'
import logcicaRelationshipField from './logcicaRelationshipField'

const imageField = [
  ...logcicaRelationshipField({
    name: 'mainImage',
    type: 'upload',
    relationTo: 'media', // required
    filterOptions: {
      mimeType: { contains: 'image' },
    },
  }),
  ...logcicaRelationshipField({
    name: 'images',
    nameSingular: 'image',
    type: 'relationship',
    hasMany: true,
    relationTo: 'media', // required
    filterOptions: {
      mimeType: { contains: 'image' },
    },
  }),
] as Field[]

export default imageField
