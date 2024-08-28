"use client";

import {useRouter} from "next/navigation";

export default function CommitButton() {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  }
  return (
    <button>
       →
    </button>
  )
}