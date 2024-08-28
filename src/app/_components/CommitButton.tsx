"use client";

import {useRouter} from "next/navigation";

export default function CommitButton() {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  }
  return (
    <button>
       <svg xmlns="http://www.w3.org/2000/svg" width="48" height="24" viewBox="0 0 48 24">
    <path d="M0 12h36v2H0z" fill="black"/>  {/* 몸통 */}
    <path d="M36 6l6 6-6 6z" fill="black"/>  {/* 끝 */}
  </svg>
    </button>
  )
}