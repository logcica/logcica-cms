/* TODO

'use client'
import React from 'react'
import { GmapsPlace } from '../payload-types'
import { DefaultCellComponentProps } from 'payload'

const baseClass = 'custom-cell'

export default function GmapsCell(props: DefaultCellComponentProps) {
  const { cellData, rowData } = props

  if (!cellData || !(cellData as GmapsPlace)) return <span></span>

  const gmaps = cellData as GmapsPlace

  const id = gmaps.placeId ?? gmaps.id

  if (!id || !rowData.center) return <span></span>

  console.log(rowData)
  const coordinates = rowData.center
  const link = `https://www.google.com/maps/search/?api=1&query=${coordinates[0]}%2C${coordinates[1]}&query_place_id=${id}`

  return (
    <span className={baseClass}>
      <a href={link} target="_blank">
        {id as string}
      </a>
    </span>
  )
}
*/
