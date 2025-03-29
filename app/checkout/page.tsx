"use client";
// TODO - Make the UI Better , and update the cookie to make the user paid user , and then after all that redirect the user to the dashboard page
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
export default function page() {
  const searchParams = useSearchParams();
  console.log(searchParams.get("pidx"));
  console.log(searchParams.get("status"));
  console.log(searchParams.get("tidx"));

  useEffect(() => {
    async function run() {
      const response = await fetch("/api/validateTransaction", {
        method: "POST",
        body: JSON.stringify({
          pidx: searchParams.get("pidx"),
        }),
      });
      const data = await response.json();

      if (data.success) {
        console.log("Done");
      } else {
        console.log("Fuck off get some money");
      }
      console.log(data);
    }

    run();
  }, []);
  return <div>{JSON.stringify(searchParams)}</div>;
}
