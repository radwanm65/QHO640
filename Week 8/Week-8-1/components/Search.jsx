"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function onChange(term) {
    const params = new URLSearchParams(searchParams);
    if (term) params.set("query", term);
    else params.delete("query");
    router.replace(`${pathname}?${params.toString()}`);
  }
  return (
    <input
      defaultValue={searchParams.get("term") ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search artists..."
    />
  );
}
