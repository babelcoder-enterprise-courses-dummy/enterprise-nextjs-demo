"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="p-4 bg-red-100 text-red-800 rounded">
      <h2>❌ Something went wrong in Dashboard</h2>
      <p>{error.message}</p>
      <button
        className="mt-2 bg-red-600 text-white px-4 py-2 rounded"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
