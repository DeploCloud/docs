import { searchDocs } from "@/lib/search";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  return Response.json(await searchDocs(params.get("query") ?? "", params.get("tag")));
}
