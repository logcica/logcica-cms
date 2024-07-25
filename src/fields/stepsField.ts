import { createHeadlessEditor } from '@lexical/headless' // <= make sure this package is installed
import { $convertFromMarkdownString, $convertToMarkdownString } from '@lexical/markdown'
import {
  BoldTextFeature,
  defaultEditorConfig,
  getEnabledNodes,
  ItalicTextFeature,
  lexicalEditor,
  OrderedListFeature,
  sanitizeEditorConfig,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import type { Field, FieldHook } from 'payload/types'

import deepMerge from '../utilities/deepMerge'
import { getLabelTranslations } from '../utilities/translate'
import StepsCell from './StepsCell'

type DescriptionType = (options?: {
  name?: string
  fields?: string[]
  overrides?: Record<string, unknown>
}) => Field

const editorConfig = defaultEditorConfig // <= your editor config here
editorConfig.features.push(BoldTextFeature())

const stepField: DescriptionType = ({
  name = 'steps',
  overrides = {},
} = {}) => {
  const stepResult: Field =
  {
    type: 'group',
    label: getLabelTranslations(name),
    interfaceName: 'Steps',
    name: name,
    admin: {
      components: {
        Cell: StepsCell,
      },
    },
    fields: [{
      name: 'OrderedList',
      type: 'richText',
      editor: lexicalEditor({
        features: [BoldTextFeature(), OrderedListFeature()],
      })
    }],
  }

  return deepMerge(stepResult, overrides)
}

const beforeChange: FieldHook<any, any, any> = async ({ value }) => {
  if (!value) return undefined

  const yourSanitizedEditorConfig = sanitizeEditorConfig(editorConfig)

  const headlessEditor = createHeadlessEditor({
    nodes: getEnabledNodes({
      editorConfig: sanitizeEditorConfig(defaultEditorConfig),
    }),
  })

  headlessEditor.setEditorState(headlessEditor.parseEditorState(value))

  let markdown: string
  headlessEditor.getEditorState().read(() => {
    markdown = $convertToMarkdownString(yourSanitizedEditorConfig?.features?.markdownTransformers)
  })

  return { markdown: markdown }
}

const afterRead: FieldHook<any, any, any> = async ({ value, findMany }) => {
  if (!value || !value.markdown) return undefined

  if (findMany) return value

  const yourSanitizedEditorConfig = sanitizeEditorConfig(editorConfig)

  const headlessEditor = createHeadlessEditor({
    nodes: getEnabledNodes({
      editorConfig: sanitizeEditorConfig(defaultEditorConfig),
    }),
  })

  headlessEditor.update(
    () => {
      $convertFromMarkdownString(
        value?.markdown,
        yourSanitizedEditorConfig.features.markdownTransformers,
      )
    },
    { discrete: true },
  )
  return headlessEditor.getEditorState().toJSON()
}

export default stepField
