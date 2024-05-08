import React, { useEffect, useState } from 'react'
import type { Props } from 'payload/components/views/Cell'
import { Activity, Organisation, Partnership, Person } from '../payload-types';
//import './index.scss' ?? how to make this work

const baseClass = 'custom-party-cell'

export interface Party {
  organisation?: (string | null) | Organisation;
  partnership?: (string | null) | Partnership;
  activity?: (string | null) | Activity;
  person?: (string | null) | Person;
}

const CustomPartyCell: React.FC<Props> = (props) => {
  const cellData: Party = props.cellData
  
  const [label, setLabel] = useState("")

  useEffect(() => {
    if(!cellData.organisation && !cellData.partnership && !cellData.activity && !cellData.person)
      return 

    let url = ""

    if(cellData.person){
      url = `${process.env.PAYLOAD_PUBLIC_API}/persons/${cellData.person as string}`
    }

    if(cellData.partnership){
      url = `${process.env.PAYLOAD_PUBLIC_API}/partnerships/${cellData.partnership as string}`
    }

    if(cellData.organisation){
      url = `${process.env.PAYLOAD_PUBLIC_API}/organisations/${cellData.organisation as string}`
    }

    if(cellData.activity){
      url = `${process.env.PAYLOAD_PUBLIC_API}/activities/${cellData.activity as string}`
    }

    fetch(url).then(async res => {
      const response = await res.json()
      setLabel(response.title ?? response.name)
    })
  }, [cellData.organisation, cellData.partnership, cellData.activity])

  return <span className={baseClass}>{label}</span>
}

export default CustomPartyCell