'use client'
import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

const baseClass = 'custom-cell'

export default function BCELinkCell(props: DefaultCellComponentProps) {
  const { cellData } = props

  if (!cellData) return <span></span>

  const number = (cellData as string).replace(/\D/g, '')
  const linkBase =
    'https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?lang=fr&ondernemingsnummer='

  return (
    <span className={baseClass}>
      <a href={linkBase + number} target="_blank">
        {cellData as string}
      </a>
    </span>
  )
}
