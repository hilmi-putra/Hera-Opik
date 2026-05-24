import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type AdminDataTableColumn<T> = {
  header: string;
  cell: (row: T, index: number) => ReactNode;
  className?: string;
  headClassName?: string;
};

type AdminDataTableProps<T> = {
  columns: AdminDataTableColumn<T>[];
  data?: T[];
  emptyMessage?: string;
  initialPageSize?: number;
  isLoading?: boolean;
  pageSizeOptions?: number[];
  rowKey?: (row: T, index: number) => string | number;
};

export function AdminDataTable<T>({
  columns,
  data = [],
  emptyMessage = "Belum ada data.",
  initialPageSize = 10,
  isLoading = false,
  pageSizeOptions = [5, 10, 50, 100],
  rowKey,
}: AdminDataTableProps<T>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const startIndex = (page - 1) * pageSize;
  const rows = useMemo(() => data.slice(startIndex, startIndex + pageSize), [data, pageSize, startIndex]);
  const firstItem = data.length === 0 ? 0 : startIndex + 1;
  const lastItem = Math.min(startIndex + pageSize, data.length);

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, totalPages));
  }, [totalPages]);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-[#F8E9E7] bg-white shadow-sm">
        <Table className="min-w-[760px]">
          <TableHeader className="bg-[#F8E9E7]/45">
            <TableRow className="hover:bg-transparent">
              {columns.map((column) => (
                <TableHead
                  key={column.header}
                  className={cn("h-11 whitespace-nowrap px-4 text-xs font-semibold uppercase tracking-wide text-[#822935]/70", column.headClassName)}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: Math.min(5, pageSize) }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.header} className="px-4 py-4">
                      <div className="h-4 w-full max-w-32 animate-pulse rounded-full bg-slate-100" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={rowKey ? rowKey(row, startIndex + index) : `${startIndex}-${index}`} className="hover:bg-[#F8E9E7]/25">
                  {columns.map((column) => (
                    <TableCell key={column.header} className={cn("px-4 py-4 align-top text-sm", column.className)}>
                      {column.cell(row, startIndex + index)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-44 text-center">
                  <div className="flex flex-col items-center justify-center gap-3 text-slate-500">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F8E9E7] text-[#822935]">
                      <Inbox className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium">{emptyMessage}</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Menampilkan <span className="font-medium text-slate-700">{firstItem}-{lastItem}</span> dari{" "}
          <span className="font-medium text-slate-700">{data.length}</span> data
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
              setPage(1);
            }}
            className="h-9 rounded-xl border border-[#F8E9E7] bg-white px-3 text-sm text-slate-700 shadow-sm outline-none focus:border-[#D65B4C]"
            aria-label="Jumlah baris per halaman"
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option} / halaman
              </option>
            ))}
          </select>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-xl border-[#F8E9E7]"
            onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
            disabled={page <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          <span className="min-w-16 text-center text-sm font-semibold text-slate-700">
            {page} / {totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-xl border-[#F8E9E7]"
            onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
            disabled={page >= totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
