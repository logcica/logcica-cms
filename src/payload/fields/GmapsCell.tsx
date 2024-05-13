import React from 'react'
import type { Props } from 'payload/components/views/Cell'
import { GmapsPlace } from '../payload-types';

const baseClass = 'custom-cell'

const GmapsCell: React.FC<Props> = (props) => {
  const { cellData, rowData } = props;

  if(!cellData || !(cellData as GmapsPlace)?.id)
    return <span></span>

  const id = (cellData as GmapsPlace)?.id
  console.log(rowData)
  const coordinates = rowData.center
  const link = `https://www.google.com/maps/search/?api=1&query=${coordinates[0]}%2C${coordinates[1]}&query_place_id=${id}`

  return <span className={baseClass}><a 
    href={link} 
    target='_blank'>{id as string}</a></span>
}

export default GmapsCell