'use client'
import { useConfig, useRowLabel } from '@payloadcms/ui'
import { Quantity } from 'payload-types'
import { useEffect, useState } from 'react'

export default function NutrientRowLabel() {
  const {
    config: { serverURL },
  } = useConfig()

  const { data, rowNumber } = useRowLabel<{
    nutrient?: string
    quantity?: Quantity
  }>()

  const returnLabel = (nutrient: string) =>
    `${nutrient || 'Nutriment ' + String(rowNumber).padStart(2, '0')}` +
    ` - ${data.quantity?.value}${data.quantity?.unit}`

  const [label, setLabel] = useState(returnLabel(data.nutrient as string))

  useEffect(() => {
    const url = `${serverURL}/api/codes/${data.nutrient}`
    fetch(url).then(async (res) => {
      setLabel(returnLabel((await res.json()).name))
    })
  }, [])

  return label
}
