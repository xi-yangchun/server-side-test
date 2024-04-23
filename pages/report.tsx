import { GetServerSideProps } from 'next'
import React from 'react'
import {Tile} from '@/components/tile';


interface ReportProps {
  serverRenderedTime: string
  integer: number;
}


const Report: React.FC<ReportProps> = (props) => {
  return (
    <div>
        <Tile></Tile>
      <h1>This is the report page.</h1>
      <p>Server-rendered at {props.serverRenderedTime}</p>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps<ReportProps> = async () => {
    const serverRenderedTime = new Date().toISOString()
    const integer:number=114;

  return {
    props: {
      serverRenderedTime,
      integer
    }
  }
}

export default Report