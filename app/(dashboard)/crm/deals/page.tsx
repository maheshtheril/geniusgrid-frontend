"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function DealsPage() {
  const [pipelines, setPipelines] = useState<any[]>([]);

  useEffect(() => {
    api.get("/crm/pipelines").then((res) => setPipelines(res.data.data));
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Deals Pipeline</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        {pipelines.map((p) => (
          <div
            key={p.pipeline_id}
            className="rounded-xl bg-white p-2 shadow dark:bg-slate-900"
          >
            <h3 className="mb-2 text-center font-semibold">{p.name}</h3>
            <div className="space-y-2">
              {p.stages.map((s: any) => (
                <div key={s.stage_id}>
                  <h4 className="text-sm font-medium">{s.name}</h4>
                  {s.deals?.map((d: any) => (
                    <div
                      key={d.deal_id}
                      className="mt-1 rounded-lg border p-2 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <p className="font-medium">{d.name}</p>
                      <p className="text-xs text-slate-500">${d.amount}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
