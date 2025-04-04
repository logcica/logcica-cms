'use client'
import { DefaultCellComponentProps } from 'payload'
import React from 'react'
//import './index.scss' ?? how to make this work

const baseClass = 'custom-cell'

type MyImage = {
  url: string
}

export default function CustomImageCell(props: DefaultCellComponentProps) {
  const { cellData } = props

  return (
    <span className={baseClass}>
      <img src={(cellData as MyImage).url} style={{ height: 50, width: 50 }}></img>
    </span>
  )
}
