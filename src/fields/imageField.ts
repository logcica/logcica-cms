import { Field } from 'payload/types'
import { getLabelTranslations } from '../utilities/translate'
import logcicaRelationshipField from './logcicaRelationshipField'

const imageField = [
  {
    name: 'mainImage', // required
    type: 'relationship', // required
    label: getLabelTranslations('mainImage'),
    relationTo: 'media', // required
    filterOptions: {
      mimeType: { contains: 'image' },
    },
  },
  {
    name: 'images', // required
    type: 'relationship', // required
    label: getLabelTranslations('images'),
    hasMany: true,
    relationTo: 'media', // required
    filterOptions: {
      mimeType: { contains: 'image' },
    },
  },
] as Field[]

export default imageField
