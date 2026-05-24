import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
};

type AdminDataTableProps<T> = {
  columns: AdminDataTableColumn<T>[];
  data?: T[];
  emptyMessage?: string;
  initialPageSize?: number;
  isLoading?: boolean;
  pageSizeOptions?: number[];
};

export function AdminDataTable<T>({
  columns,
  data = [],
  emptyMessage = "Belum ada data.",
  initialPageSize = 5,
  isLoading = false,
  pageSizeOptions = [5, 10, 20],
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
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.header} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-28 text-center text-muted-foreground">
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={`${startIndex}-${index}`}>
                  {columns.map((column) => (
                    <TableCell key={column.header} className={cn("align-top", column.className)}>
                      {column.cell(row, startIndex + index)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-28 text-center text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Menampilkan {firstItem}-{lastItem} dari {data.length} data
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
              setPage(1);
            }}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
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
            onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
            disabled={page <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          <span className="min-w-16 text-center text-sm font-medium">
            {page} / {totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
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
