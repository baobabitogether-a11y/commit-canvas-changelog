import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Minimal Page" },
      { name: "description", content: "A minimal page reading from the database." },
      { property: "og:title", content: "Minimal Page" },
      { property: "og:description", content: "A minimal page reading from the database." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const [rows, setRows] = useState<{ id: string; body: string }[] | null>(null);
  useEffect(() => {
    supabase.from("messages").select("id, body").then(({ data }) => setRows(data ?? []));
  }, []);
  return (
    <main>
      <h1>Minimal Page</h1>
      {rows === null ? <p>Loading...</p> : <ul>{rows.map((r) => <li key={r.id}>{r.body}</li>)}</ul>}
    </main>
  );
}
