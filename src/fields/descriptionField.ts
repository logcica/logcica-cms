import { createHeadlessEditor } from '@lexical/headless' // <= make sure this package is installed
import { $convertFromMarkdownString, $convertToMarkdownString } from '@lexical/markdown'
import {
  BoldTextFeature,
  convertLexicalToHTML,
  defaultEditorConfig,
  FeatureProvider,
  getEnabledNodes,
  ItalicTextFeature,
  lexicalEditor,
  OrderedListFeature,
  sanitizeEditorConfig,
} from '@payloadcms/richtext-lexical'
import type { Field, FieldHook } from 'payload/types'

import deepMerge from '../utilities/deepMerge'
import { getLabelTranslations } from '../utilities/translate'
import DescriptionCell from './DescriptionCell'


type DescriptionType = (options?: {
  name?: string
  fields?: string[]
  features?: string[]
  overrides?: Record<string, unknown>
}) => Field

const features_dict = {Bold : BoldTextFeature(), Italic : ItalicTextFeature(), OrderedList: OrderedListFeature() };

const descriptionField: DescriptionType = ({
  name = 'description',
  fields = ['short', 'long'],
  features = ['Bold'],
  overrides = {},
} = {}) => {

  const selectedFeatures = features.map(feature => features_dict[feature]);

  const editorConfig = defaultEditorConfig // <= your editor config here
  editorConfig.features.push(...selectedFeatures)

  const beforeChange: FieldHook<any, any, any> = async ({ value }) => {
    if (!value) return undefined
  
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

  const descriptionResult: Field = {
    type: 'group',
    label: getLabelTranslations(name),
    interfaceName: 'Description',
    name: name,
    admin: {
      components: {
        Cell: DescriptionCell,
      },
    },
    fields: fields.map(
      f =>
        ({
          name: f,
          type: 'richText',
          label: getLabelTranslations(f + '_female'),
          editor: lexicalEditor({
            features: selectedFeatures
          }),
          hooks: {
            beforeChange: [beforeChange],
            afterRead: [afterRead],
          },
        } as Field),
    ),
  }

  return deepMerge(descriptionResult, overrides)
}

export default descriptionField