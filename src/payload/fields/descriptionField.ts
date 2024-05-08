import type { Field } from 'payload/types'
import deepMerge from '../utilities/deepMerge'

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

type DescriptionType = (options?: {
  name?: string
  overrides?: Record<string, unknown>
}) => Field

const editorConfig = defaultEditorConfig; // <= your editor config here
editorConfig.features.push(BoldTextFeature())

const descriptionField: DescriptionType = ({ name = "description", overrides = {} } = {}) => {
  const descriptionResult: Field = {
    type: 'group',
    name: name,
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
  
              const yourSanitizedEditorConfig = sanitizeEditorConfig(editorConfig)
  
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
  
                const yourSanitizedEditorConfig = sanitizeEditorConfig(editorConfig)
  
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
  }

  return deepMerge(descriptionResult, overrides)
}

export default descriptionField
