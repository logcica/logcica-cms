import {
  BoldFeature,
  ItalicFeature,
  OrderedListFeature,
  convertMarkdownToLexical,
  InlineToolbarFeature,
  convertLexicalToMarkdown,
  DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import type { Field, SanitizedConfig } from 'payload'

import { editorConfigFactory, lexicalEditor } from '@payloadcms/richtext-lexical'

import deepMerge from '../utilities/deepMerge'
import { getLabelTranslations } from '../utilities/translate'

type DescriptionType = (options?: {
  name?: string
  fields?: string[]
  features?: string[]
  overrides?: Record<string, unknown>
}) => Field

const features_dict: Record<string, any> = {
  BoldText: BoldFeature(),
  ItalicText: ItalicFeature(),
  OrderedList: OrderedListFeature(),
  InlineToolbarFeature: InlineToolbarFeature(),
}

const descriptionField: DescriptionType = ({
  name = 'description',
  fields = ['short', 'long'],
  features = ['BoldText', 'ItalicText', 'InlineToolbarFeature'],
  overrides = {},
} = {}) => {
  const selectedFeatures = features.map((feature) => features_dict[feature])

  const config: SanitizedConfig = {} as SanitizedConfig

  const descriptionResult: Field = {
    type: 'group',
    label: getLabelTranslations(name),
    interfaceName: 'Description',
    name: name,
    admin: {
      components: {
        Cell: 'src/fields/DescriptionCell',
      },
    },
    fields: fields.map(
      (f) =>
        ({
          name: f,
          type: 'richText',
          label: getLabelTranslations(f + '_female'),
          editor: lexicalEditor({
            features: selectedFeatures,
          }),
          hooks: {
            beforeChange: [
              async ({ value }) => {
                if (!value) return undefined
                const markdown = convertLexicalToMarkdown({
                  editorConfig: await editorConfigFactory.fromFeatures({
                    config,
                    features: selectedFeatures,
                  }),
                  data: value,
                })

                return { markdown: markdown }
              },
            ],
            afterRead: [
              async ({ value }) => {
                if (!value?.markdown) return undefined
                return convertMarkdownToLexical({
                  editorConfig: await editorConfigFactory.fromFeatures({
                    config,
                    features: selectedFeatures,
                  }),
                  markdown: value.markdown,
                })
              },
            ],
          },
        }) as Field,
    ),
  }

  return deepMerge(descriptionResult, overrides)
}

export default descriptionField
