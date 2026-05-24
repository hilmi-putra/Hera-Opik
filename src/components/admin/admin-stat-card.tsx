import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type AdminStatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  tone?: "coral" | "rose" | "cream" | "green" | "blue";
};

const toneClass = {
  coral: "bg-[#D65B4C]/10 text-[#D65B4C]",
  rose: "bg-[#822935]/10 text-[#822935]",
  cream: "bg-[#F8E9E7] text-[#822935]",
  green: "bg-emerald-50 text-emerald-700",
  blue: "bg-sky-50 text-sky-700",
};

export function AdminStatCard({
  title,
  value,
  description,
  icon: Icon,
  tone = "coral",
}: AdminStatCardProps) {
  return (
    <Card className="overflow-hidden border-[#F8E9E7] bg-white shadow-sm">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
          {description && <p className="mt-2 text-xs leading-relaxed text-slate-500">{description}</p>}
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${toneClass[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
