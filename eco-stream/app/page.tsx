"use client";

import { KpiCards } from "@/components/widgets/kpi-cards";
import { NormalizedOverflow } from "@/lib/types/overflow";
import { useEffect, useState } from "react";


export default function Home() {

  const [overflowData, setOverflowData] = useState<NormalizedOverflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadOverflowData() {
    try {
      setError(null);
      const result = await fetch("/api/overflows");
      if (!result.ok) throw new Error(`${result.status}`);
      const json = (await result.json()) as NormalizedOverflow[];
      setOverflowData(json);
    }
    catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOverflowData();
  }, []);

  if (loading) return <p>Loading ....</p>
  if (error) return <p>Error: {error}</p>
  
  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <KpiCards overflowData={overflowData} />
      </main>
    </div>
  );
}
