'use client'
import React from 'react'
import { DefaultCellComponentProps } from 'payload'

const baseClass = 'custom-cell'

export default function CustomLinkCell(props: DefaultCellComponentProps) {
  const { cellData } = props

  return (
    <span className={baseClass}>
      <a href={cellData as string} target="_blank">
        {cellData as string}
      </a>
    </span>
  )
}
