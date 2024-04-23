import { NextResponse } from 'next/server';

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

export async function POST(req: Request){
  try {
      const data=req.body;
      const datastr:string=await streamToString(data);
      const datadict=await QueryStringToDict(datastr);
      console.log(datastr);
      console.log(datadict["q"]);
    return NextResponse.json({ message: 'this is hello route' })
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' })
  }
}