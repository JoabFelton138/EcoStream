"use client";

import { useEffect, useState } from "react";
import { NormalizedOverflow } from "@/lib/types/overflow";

export const DataTest = () => {
  const [data, setData] = useState<NormalizedOverflow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/overflows");
      const json = (await res.json()) as NormalizedOverflow[];
      setData(json);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p>Loading data test...</p>;

  return (
    <div>
      <h1>Data Test</h1>
      <p>Total records: {data.length}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};