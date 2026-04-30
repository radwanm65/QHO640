import Search from "@/components/Search";
import Results from "@/components/Results";
import { getArtists } from "@/lib/data";

export default async function Page({ searchParams }) {
  const params = await searchParams;

  const query = params?.query ?? "";
  const results = getArtists(query);

  return (
    <main>
      <h1>Search for Artist</h1>
      <Search />
      <Results items={results} />
    </main>
  );
}
