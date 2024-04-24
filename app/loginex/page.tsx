'use client'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

export default function Home() {
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    const [postedData, setPostedData] = useState('')
    const router = useRouter();

  const onChangeId = (e:any) => {
    setId(e.target.value)
  }
  const onChangePw = (e:any) => {
    setPw(e.target.value)
  }

  const onSubmitHandler = async (e:any) => {
    e.preventDefault()

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: "id="+id+"&"+"pw="+pw,
    })
    if(res.ok){
        console.log("cookies:"+document.cookie
          .replace(/(?:(?:^|.*;\s*)session-id\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
        router.push("/secure0");
    }

    const data = await res.json()
    setPostedData(data.body)
  }
  return (
    <div>
      <form onSubmit={onSubmitHandler} className='flex flex-col justify-center' action='/api/form' method='POST'>
          <input value={id} onChange={onChangeId} type='text' name='id' placeholder='ID' />
          <input value={pw} onChange={onChangePw} type='text' name='pw' placeholder='PASSWORD' />
          <button type='submit'>送信</button>
        </form>
    </div>
  );
}