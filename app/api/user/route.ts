import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Cookie取得
  const sessionCookie = request.cookies.get("session-id")

  if (!sessionCookie) {
    return new NextResponse(JSON.stringify({ errMsg: "一定時間が経過したので、再ログインが必要です。" }), { status: 400 })
  }

    //擬似データベース
    const sessiondict={"name":"田所浩二","age":"24"};
    // sessionのcookieからidを取り出す
    const sessionId:string = sessionCookie.value;

    // 返却するユーザーデータをまとめる
    const userData = {
        name: sessiondict["name"],
        age: sessiondict["age"]
    }

    return new NextResponse(JSON.stringify({ userData }), { status: 200 });
}