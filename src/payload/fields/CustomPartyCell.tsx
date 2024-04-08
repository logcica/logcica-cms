import React, { useEffect, useState } from 'react'
import type { Props } from 'payload/components/views/Cell'
import { Party } from '../payload-types';
//import './index.scss' ?? how to make this work

const baseClass = 'custom-party-cell'

const CustomPartyCell: React.FC<Props> = (props) => {
  const cellData: Party = props.cellData
  
  const [label, setLabel] = useState("")

  useEffect(() => {
    if(!cellData.partnership) return
    const url = `${process.env.PAYLOAD_PUBLIC_API}/partnerships/${cellData.partnership as string}`
    fetch(url).then(async res => {
      const response = await res.json()
      setLabel(response.name)
    })
  }, [cellData.partnership])

  return <span className={baseClass}>{label}</span>
}

export default CustomPartyCell