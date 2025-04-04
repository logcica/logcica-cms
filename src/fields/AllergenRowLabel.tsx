'use client'
import { useConfig, useRowLabel } from '@payloadcms/ui'
import { Quantity } from 'payload-types'
import { useEffect, useState } from 'react'

export default function AllergenRowLabel() {
  const {
    config: { serverURL },
  } = useConfig()

  const { data, rowNumber } = useRowLabel<{
    allergen?: string
    quantity?: Quantity
  }>()

  const returnLabel = (allergen: string) =>
    `${allergen || 'Allergène ' + String(rowNumber).padStart(2, '0')}`

  const [label, setLabel] = useState(returnLabel(data.allergen as string))

  useEffect(() => {
    const url = `${serverURL}/api/codes/${data.allergen}`
    fetch(url).then(async (res) => {
      setLabel(returnLabel((await res.json()).name))
    })
  }, [])

  return label
}
