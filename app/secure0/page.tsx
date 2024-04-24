"use client"
import React from 'react'
import {Tile} from '@/components/tile';
import { redirect } from 'next/dist/server/api-utils';
import { streamToString, QueryStringToDict } from '@/util/basefunc';
import { json } from 'stream/consumers';
import { useState, useEffect } from 'react'
import '../globals.css';

interface Sec0Props {
  serverRenderedTime: string
  authed:boolean;
}

const Sec0: React.FC<Sec0Props> = (props) => {
    const [session_sc, setSSC] = useState(false);
    React.useEffect(() => {
        // 1秒ごとにtick関数を実行するタイマーを設定します
        //**const timerId = setInterval(async () => {
        const fetch_login=async()=>{
            const sessionID=document.cookie
            .replace(/(?:(?:^|.*;\s*)session-id\s*\=\s*([^;]*).*$)|^.*$/, "$1")
            const expires_at=document.cookie
            .replace(/(?:(?:^|.*;\s*)expires-at\s*\=\s*([^;]*).*$)|^.*$/, "$1")
            const authres:Response=await fetch('http://localhost:3000/api/home', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Cookie': `session-id=${sessionID};expires-at=${expires_at}; SameSite=Strict`
                },
              })
              console.log("this_line");
              const resdic= JSON.parse(await streamToString(authres.body));
              const authed:boolean=resdic["auth"];
              setSSC(authed);
        }
        fetch_login();
        //**}, 1000);
    
        // クリーンアップ関数を定義します。この関数はコンポーネントがアンマウントされたとき、
        // または依存配列が更新されたときに呼ばれます。
        // ここではタイマーをクリアします
        //**return () => clearInterval(timerId)
    }, [session_sc])

    if(session_sc){
        return (
            <div>
                <Tile></Tile>
            <h1>This is Secure0.(good cookie)</h1>
            <p>Server-rendered at {props.serverRenderedTime}</p>
            </div>
        )
    }else{
        return (
            <div>
                <Tile></Tile>
            <h1>Secure0 is Prohibited.(bad cookie)</h1>
            <p>Server-rendered at {props.serverRenderedTime}</p>
            </div>
        )
    }
}


export default Sec0