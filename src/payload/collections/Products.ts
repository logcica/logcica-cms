import type { CollectionConfig } from 'payload/types'
import categoriesField from '../fields/CategoriesField'
import { useEffect, useState } from 'react'
import ownerPartyField from '../fields/ownerPartyField'
import producerPartyField from '../fields/producerPartyField'
import quantityField from '../fields/quantityField'

import { createHeadlessEditor } from '@lexical/headless' // <= make sure this package is installed
import {
  getEnabledNodes,
  sanitizeEditorConfig,
  defaultEditorConfig
} from '@payloadcms/richtext-lexical'

import {
  lexicalEditor, BoldTextFeature,
} from '@payloadcms/richtext-lexical'

import { $convertToMarkdownString, $convertFromMarkdownString } from '@lexical/markdown'
import { canManageOrContribute } from './canRead';

const yourEditorConfig = defaultEditorConfig; // <= your editor config here
yourEditorConfig.features.push(BoldTextFeature())

const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: {
      en: 'Product',
      fr: 'Produit',
    },
    plural: {
      en: 'Products',
      fr: 'Produits',
    },
  },
  versions: {
    drafts: false,
    maxPerDoc: 10
  },
  admin: {
    useAsTitle: 'name',
    group: 'Gestion',
  },
  access: {
    read: canManageOrContribute({placeInProperty: 'area', tenancyInAnyProperty: ['owner','producer']}),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      type: 'group',
      name: 'ingredientStatement',
      fields: [
        {
          name: 'short',
          type: 'richText',
          editor: lexicalEditor({
            features: [BoldTextFeature()]
          }),
          hooks: {
            beforeChange: [
              async ({value}) => {
    
                if(!value)
                  return undefined
    
                const yourSanitizedEditorConfig = sanitizeEditorConfig(yourEditorConfig)
    
                const headlessEditor = createHeadlessEditor({
                  nodes: getEnabledNodes({
                    editorConfig: sanitizeEditorConfig(defaultEditorConfig),
                  }),
                })
    
                headlessEditor.setEditorState(headlessEditor.parseEditorState(value)) // This should commit the editor state immediately
    
                let markdown: string
                headlessEditor.getEditorState().read(() => {
                  markdown = $convertToMarkdownString(yourSanitizedEditorConfig?.features?.markdownTransformers)
                })
    
                return { markdown: markdown}
              }
            ],
            afterRead: [
                async ({value}) => {
    
                  if(!value || !value.markdown)
                    return undefined
    
                  const yourSanitizedEditorConfig = sanitizeEditorConfig(yourEditorConfig)
    
                  const headlessEditor = createHeadlessEditor({
                    nodes: getEnabledNodes({
                      editorConfig: sanitizeEditorConfig(defaultEditorConfig),
                    }),
                  })
                  
                  headlessEditor.update(() => { $convertFromMarkdownString(value?.markdown, yourSanitizedEditorConfig.features.markdownTransformers) }, { discrete: true })
                  return headlessEditor.getEditorState().toJSON()
                }
            ]
          }
        },
      ]
    },
    ownerPartyField,
    producerPartyField,
    {
      name: 'mainImage', // required
      type: 'upload', // required
      relationTo: 'media', // required
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'images', // required
      type: 'relationship', // required
      hasMany: true,
      relationTo: 'media', // required
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    quantityField({name: 'netWeight'}),
    {
        name: 'dimensions',
        type: 'group',
        fields: [
          {
            type: 'collapsible',
            label: (data) => [data?.data?.length?.value, data?.data?.width?.value, data?.data?.height?.value].filter(d => d).join(" x "),
            fields: [
              quantityField({name: 'length'}),
              quantityField({name: 'width'}),
              quantityField({name: 'height'}),
              quantityField({name: 'volume'}),
            ]
          }
        ]
    },
    categoriesField,
    {
      name: 'allergenList',
      type: 'array',
      admin: {
        components: {
          RowLabel: ({ data, index, path }) => {
            const [label, setLabel] = useState(`Allergène ${String(index).padStart(2, '0')}`)

            console.log(data)
            useEffect(() => {
              const url = `${process.env.PAYLOAD_PUBLIC_API}/codes/${data.allergen}`
              console.log(url)
              fetch(url).then(async res => {
                setLabel((await res.json()).name)
              })
            }, [data.name])

            return label
          },
        },
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'containmentLevel',
              type: 'relationship',
              relationTo: 'codes',
              filterOptions: () => {
                return {
                  list: { equals: '64e61fda2b00ce4a7ee277ff' },
                }
              },
            },
            {
              name: 'allergen',
              type: 'relationship',
              relationTo: 'codes',
              filterOptions: () => {
                return {
                  list: { equals: '64e61fda2b00ce4a7ee277fe' },
                }
              },
            },
          ],
        },
      ],
    },
    {
      name: 'nutrientList',
      type: 'array',
      admin: {
        components: {
          RowLabel: ({ data, index, path }) => {
            const [label, setLabel] = useState(`Nutriment ${String(index).padStart(2, '0')}`)

            useEffect(() => {
              const url = `${process.env.PAYLOAD_PUBLIC_API}/codes/${data.nutrient}`
              console.log(url)
              fetch(url).then(async res => {
                setLabel((await res.json()).name)
              })
            }, [data.name])

            return label
          },
        },
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'nutrient',
              type: 'relationship',
              relationTo: 'codes',
              filterOptions: () => {
                return {
                  list: { equals: '651d94b094bcb52b76132eaa' },
                }
              },
            },
            {
              name: 'quantity',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'value',
                      type: 'number'
                    },
                    {
                      name: 'unit',
                      type: 'relationship',
                      relationTo: 'units',
                    }
                  ]
                }
              ]
            },
          ],
        },
      ],
    },
    {
      name: 'area',
      type: 'relationship',
      relationTo: 'places',
      hasMany: false,
    },
  ],
}

export default Products
