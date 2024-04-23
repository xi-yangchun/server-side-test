import { GetServerSideProps } from 'next'
import React from 'react'


interface HomeProps {
  serverRenderedTime: string
}


const Home: React.FC<HomeProps> = (props) => {
  return (
    <main className="text-lg">
      <div>
        <h1>Hello, Next.js!</h1>
        <p>Server-rendered at {props.serverRenderedTime}</p>
      </div>
    </main>
  )
}


export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const serverRenderedTime = new Date().toISOString()


  return {
    props: {
      serverRenderedTime,
    }
  }
}

export default Home