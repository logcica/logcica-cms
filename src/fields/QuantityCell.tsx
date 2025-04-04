import React from 'react'
import { Quantity } from '../payload-types'
import { DefaultCellComponentProps } from 'payload'
//import './index.scss' ?? how to make this work

const baseClass = 'custom-cell'

export default function QuantityCell(props: DefaultCellComponentProps) {
  const { cellData } = props

  return (
    <span className={baseClass}>
      {(cellData as Quantity)?.value as number} {(cellData as Quantity)?.unit as string}
    </span>
  )
}
