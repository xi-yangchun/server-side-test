'use client';
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    if (!router.isReady) {
        return <div>Loading</div>;
    }
    router.push("/report");
    /*
  useEffect(() => {
    const isReady=router.isReady
    if (router.isReady) {
        router.push("/report");
    }
  }, [router,router.isReady]);
  */
}