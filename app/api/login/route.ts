import { NextRequest, NextResponse } from "next/server";
//import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers'

async function streamToString(stream: any) {
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString('utf8');
  }
  
  async function QueryStringToDict(queryString:string){
        const searchParams = new URLSearchParams(queryString);
        let queryEntries = searchParams.entries();
        let queryParamsObject = Object.fromEntries(queryEntries);
        return queryParamsObject;
  }

export async function POST(request: NextRequest) {
  // Iパスを受け取る
    const data=request.body;
    const datastr:string=await streamToString(data);
    const datadict=await QueryStringToDict(datastr);
    console.log(datadict)
    const id:string=datadict["id"];const pw:string=datadict["pw"]

    // パスワード照合
    if (id!="user"||pw!="passwd") {
      // パスワード不一致でエラーを返却
      return new NextResponse(JSON.stringify({ "errMsg": "IDかパスワードが違います。" }), {
        status: 401,
      })
    }

    // セッションIDの作成
    const sessionID = "session";

    // セッション期限の設定（1時間後）
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds()+30);
    const sessiondata=[sessionID, id, expiresAt];
    cookies().set("expires-at",expiresAt.toISOString())
    return new NextResponse(JSON.stringify({ auth: true }), {
        status: 200,
        headers: {
            'Set-Cookie': `session-id=${sessionID}; Path=/; SameSite=Strict;`//HttpOnlyをつけてはならない。読めなく成る
        },
    })
}