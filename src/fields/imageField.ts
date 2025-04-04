import { getLabelTranslations } from '../utilities/translate'
import { Field } from 'payload'

const imageField = [
  {
    name: 'mainImage',
    label: getLabelTranslations('mainImage'),
    type: 'upload',
    relationTo: 'media', // required
    filterOptions: {
      mimeType: { contains: 'image' },
    },
  },
  {
    name: 'images',
    label: getLabelTranslations('images'),
    type: 'relationship',
    hasMany: true,
    relationTo: 'media', // required
    filterOptions: {
      mimeType: { contains: 'image' },
    },
  },
] as Field[]

export default imageField
