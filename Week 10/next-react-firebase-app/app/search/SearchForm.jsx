"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchForm({ params }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  async function handleSearch() {
    const type = document.getElementById("artist").value;
    const params = new URLSearchParams(searchParams);
    params.set("artist", type);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      Artist Name: <input id="artist" />
      <input type="button" value="Go!" onClick={handleSearch} />
    </div>
  );
}
