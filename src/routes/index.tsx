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
  const [text, setText] = useState("");
  const load = () =>
    supabase.from("messages").select("id, body").order("created_at").then(({ data }) => setRows(data ?? []));
  useEffect(() => {
    load();
  }, []);
  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    await supabase.from("messages").insert({ body: text.trim() });
    setText("");
    load();
  };
  return (
    <main>
      <h1>Minimal Page</h1>
      <form onSubmit={add}>
        <input value={text} onChange={(e) => setText(e.target.value)} maxLength={500} />
        <button>Add</button>
      </form>
      {rows === null ? <p>Loading...</p> : <ul>{rows.map((r) => <li key={r.id}>{r.body}</li>)}</ul>}
    </main>
  );
}
