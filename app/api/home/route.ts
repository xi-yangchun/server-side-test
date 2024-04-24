'use server';
import { NextRequest, NextResponse } from "next/server";
//import { v4 as uuidv4 } from 'uuid'
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
    const sessionid=request.cookies.get("session-id");
    //console.log(sessionid);

    let authres=true;
    if(sessionid?.value=="session"){
        authres=true;
    }else{
        authres=false;
    }
    const datestr:string=request.cookies.get("expires-at")?.value||"";
    console.log("datestr: "+datestr);
    const expiresAt:Date=new Date(datestr);
    if((new Date()).getTime()>=expiresAt.getTime()){
        authres=authres&&false;
    }else{
        authres=authres&&true;
    }
    const now:Date=new Date()
    now.setSeconds(now.getSeconds()+30)
    const new_expire:Date=now
    if(authres){
        cookies().set("expires-at",new_expire.toISOString())
        return new NextResponse(JSON.stringify({ auth: authres }), {
            status: 200,
            headers:{
                "Set-Cookie":`session-id=session; Path=/; SameSite=Strict;`,
            }
        })
    }else{
        cookies().set("expires-at",expiresAt.toISOString())
        return new NextResponse(JSON.stringify({ auth: authres }), {
            status: 200,
            headers:{
                "Set-Cookie":`session-id=bad; Path=/; SameSite=Strict;`
            }
        })
    }
}