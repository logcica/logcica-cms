'use client'
import React from 'react'
import { Description } from '../payload-types'
import { DefaultCellComponentProps } from 'payload'
//import './index.scss' ?? how to make this work

const baseClass = 'custom-cell'

export default function DescriptionCell(props: DefaultCellComponentProps) {
  const { cellData } = props

  return <span className={baseClass}>{(cellData as Description)?.short?.markdown as string}</span>
}
