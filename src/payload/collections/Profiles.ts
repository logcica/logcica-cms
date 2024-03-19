import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload/types'
import CustomLinkCell from '../fields/CustomLinkCell'

const Profiles: CollectionConfig = {
  slug: 'profiles',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'key',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'type',
      type: 'text',
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        components: {
          Cell: CustomLinkCell,
        },
      },
    },
    /*
    {
      name: 'image',
      type: 'text',
      hooks: {
        beforeValidate: [
          ({ value, operation }) => {
            console.log('before validate')
            console.log(value)
            if (value) {
              return { url: value }
            }
            return
          },
        ],
        afterRead: [
          ({ value }) => {
            console.log('after read')
            console.log(value)
            // Format date for display
            return value?.url
          },
        ],
      },
    },
    {
      name: 'description', // required
      type: 'group', // required
      interfaceName: 'Description', // optional
      fields: [
        {
          name: 'short', // required
          type: 'group', // required
          fields: [
            {
              name: 'richText',
              type: 'richText',
            },
          ],
        },
      ],
    },
    */
  ],
}

export default Profiles
