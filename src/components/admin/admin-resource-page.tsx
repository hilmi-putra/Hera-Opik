import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Eye, Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminDataTable, type AdminDataTableColumn } from "@/components/admin/admin-data-table";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type AdminResourceField<T> = {
  key: keyof T & string;
  label: string;
  type?: "text" | "textarea" | "number" | "email" | "url" | "date" | "time" | "select" | "file";
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  defaultValue?: string;
};

export type AdminResourceStat = {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  tone?: "coral" | "rose" | "cream" | "green" | "blue";
};

type ResourceAction = "create" | "edit" | "detail" | "delete" | null;

export type AdminResourceFilter<T> = {
  key: string;
  label: string;
  allLabel?: string;
  options: { label: string; value: string }[];
  match: (row: T, value: string) => boolean;
};

type AdminResourcePageProps<T extends { id: string | number }> = {
  title: string;
  description: string;
  icon: LucideIcon;
  data?: T[];
  isLoading?: boolean;
  columns: AdminDataTableColumn<T>[];
  fields: AdminResourceField<T>[];
  searchPlaceholder?: string;
  emptyMessage?: string;
  stats?: AdminResourceStat[];
  filters?: AdminResourceFilter<T>[];
  getSearchText: (row: T) => string;
  createItem: (form: Record<string, string> | FormData) => T | Promise<T>;
  updateItem: (row: T, form: Record<string, string> | FormData) => T | Promise<T>;
  deleteItem?: (row: T) => void | Promise<void>;
  detailFields?: { label: string; value: (row: T) => ReactNode }[];
};

const getFormValue = (value: unknown) => {
  if (value === null || value === undefined) return "";
  return String(value);
};

const getFieldFormValue = <T,>(field: AdminResourceField<T>, value: unknown) => {
  const formValue = getFormValue(value);
  if (field.type === "date" && formValue.includes("T")) return formValue.slice(0, 10);
  if (field.type === "time" && formValue.length > 5) return formValue.slice(0, 5);
  return formValue;
};

export function AdminResourcePage<T extends { id: string | number }>({
  title,
  description,
  icon: Icon,
  data = [],
  isLoading = false,
  columns,
  fields,
  searchPlaceholder = "Cari data...",
  emptyMessage,
  stats = [],
  filters = [],
  getSearchText,
  createItem,
  updateItem,
  deleteItem,
  detailFields,
}: AdminResourcePageProps<T>) {
  const [rows, setRows] = useState<T[]>(data);
  const [query, setQuery] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [action, setAction] = useState<ResourceAction>(null);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [fileForm, setFileForm] = useState<Record<string, File | null>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setRows(data);
  }, [data]);

  const buildEmptyForm = () => Object.fromEntries(fields.map((field) => [field.key, field.defaultValue ?? ""]));

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesSearch = !normalizedQuery || getSearchText(row).toLowerCase().includes(normalizedQuery);
      const matchesFilters = filters.every((filter) => {
        const value = filterValues[filter.key];
        return !value || filter.match(row, value);
      });

      return matchesSearch && matchesFilters;
    });
  }, [filterValues, filters, getSearchText, query, rows]);

  const openCreate = () => {
    setSelectedRow(null);
    setForm(buildEmptyForm());
    setFileForm({});
    setAction("create");
  };

  const openEdit = (row: T) => {
    setSelectedRow(row);
    setForm(Object.fromEntries(fields.map((field) => [field.key, getFieldFormValue(field, row[field.key])])));
    setFileForm({});
    setAction("edit");
  };

  const openDetail = (row: T) => {
    setSelectedRow(row);
    setAction("detail");
  };

  const openDelete = (row: T) => {
    setSelectedRow(row);
    setAction("delete");
  };

  const closeDialog = () => {
    setAction(null);
    setSelectedRow(null);
    setForm({});
    setFileForm({});
  };

  const getErrorMessage = (error: unknown) => (error instanceof Error ? error.message : "Aksi gagal diproses.");

  const validateRequiredFields = () => {
    const emptyField = fields.find((field) => {
      if (!field.required) return false;
      if (field.type === "file") {
        return !form[field.key]?.trim() && !fileForm[field.key];
      }

      return !form[field.key]?.trim();
    });
    if (emptyField) {
      toast.error(`${emptyField.label} wajib diisi.`);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateRequiredFields()) return;
    setIsSaving(true);

    const hasFileField = fields.some((field) => field.type === "file");
    const payload: Record<string, string> | FormData = hasFileField ? new FormData() : { ...form };

    if (payload instanceof FormData) {
      fields.forEach((field) => {
        if (field.type === "file") {
          const file = fileForm[field.key];
          if (file) {
            payload.append(field.key, file);
          }
          return;
        }

        const value = form[field.key] ?? "";
        if (value !== "") {
          payload.append(field.key, value);
        }
      });
    }

    if (action === "create") {
      try {
        const createdItem = await createItem(payload);
        setRows((currentRows) => [createdItem, ...currentRows]);
        toast.success(`${title} berhasil ditambahkan.`);
        closeDialog();
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setIsSaving(false);
      }
      return;
    }

    if (action === "edit" && selectedRow) {
      try {
        const updatedItem = await updateItem(selectedRow, payload);
        setRows((currentRows) => currentRows.map((row) => (row.id === selectedRow.id ? updatedItem : row)));
        toast.success(`${title} berhasil diperbarui.`);
        closeDialog();
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setIsSaving(false);
      }
      return;
    }

    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!selectedRow) return;
    setIsSaving(true);
    try {
      await deleteItem?.(selectedRow);
      setRows((currentRows) => currentRows.filter((row) => row.id !== selectedRow.id));
      toast.success(`${title} berhasil dihapus.`);
      closeDialog();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  const columnsWithActions: AdminDataTableColumn<T>[] = [
    ...columns,
    {
      header: "Aksi",
      headClassName: "text-right",
      className: "text-right",
      cell: (row) => (
        <div className="flex justify-end gap-1.5">
          <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-xl text-slate-500 hover:bg-[#F8E9E7] hover:text-[#822935]" onClick={() => openDetail(row)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-xl text-slate-500 hover:bg-[#F8E9E7] hover:text-[#D65B4C]" onClick={() => openEdit(row)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-700" onClick={() => openDelete(row)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const renderFormField = (field: AdminResourceField<T>) => {
    const value = form[field.key] ?? "";
    const onChange = (nextValue: string) => setForm((currentForm) => ({ ...currentForm, [field.key]: nextValue }));

    return (
      <div key={field.key} className="space-y-2">
        <Label htmlFor={field.key} className="text-sm font-semibold text-slate-700">
          {field.label}
        </Label>
        {field.type === "textarea" ? (
          <Textarea
            id={field.key}
            value={value}
            required={field.required}
            placeholder={field.placeholder}
            onChange={(event) => onChange(event.target.value)}
            className="min-h-24 rounded-xl border-[#F8E9E7] focus-visible:ring-[#D65B4C]"
          />
        ) : field.type === "select" ? (
          <select
            id={field.key}
            value={value}
            required={field.required}
            onChange={(event) => onChange(event.target.value)}
            className="flex h-10 w-full rounded-xl border border-[#F8E9E7] bg-white px-3 py-2 text-sm outline-none focus:border-[#D65B4C]"
          >
            <option value="">Pilih {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : field.type === "file" ? (
          <div className="space-y-2">
            {value && (
              <div className="overflow-hidden rounded-2xl border border-[#F8E9E7] bg-[#F8E9E7]/40">
                <img src={value} alt={field.label} className="h-40 w-full object-cover" />
              </div>
            )}
            <Input
              id={field.key}
              type="file"
              accept="image/*"
              required={field.required && !value}
              onChange={(event) =>
                setFileForm((currentFiles) => ({
                  ...currentFiles,
                  [field.key]: event.target.files?.[0] ?? null,
                }))
              }
              className="rounded-xl border-[#F8E9E7] focus-visible:ring-[#D65B4C]"
            />
            <p className="text-xs text-slate-500">{fileForm[field.key] ? fileForm[field.key]?.name : "Kosongkan jika tidak ingin mengubah gambar."}</p>
          </div>
        ) : (
          <Input
            id={field.key}
            type={field.type ?? "text"}
            value={value}
            required={field.required}
            placeholder={field.placeholder}
            onChange={(event) => onChange(event.target.value)}
            className="rounded-xl border-[#F8E9E7] focus-visible:ring-[#D65B4C]"
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F8E9E7] text-[#822935]">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
              <p className="mt-1 max-w-2xl text-sm text-slate-500">{description}</p>
            </div>
          </div>
        </div>
        <Button type="button" onClick={openCreate} className="rounded-xl bg-[#D65B4C] text-white hover:bg-[#BF4E41]">
          <Plus className="h-4 w-4" />
          Tambah Data
        </Button>
      </div>

      {stats.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <AdminStatCard key={stat.title} {...stat} />
          ))}
        </div>
      )}

      <Card className="border-[#F8E9E7] bg-white shadow-sm">
        <CardHeader className="flex flex-col gap-4 pb-4 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-lg font-semibold text-slate-950">Data {title}</CardTitle>
          <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} className="rounded-xl border-[#F8E9E7] pl-9 focus-visible:ring-[#D65B4C]" />
            </div>
            {filters.map((filter) => (
              <select
                key={filter.key}
                value={filterValues[filter.key] ?? ""}
                onChange={(event) =>
                  setFilterValues((currentFilters) => ({
                    ...currentFilters,
                    [filter.key]: event.target.value,
                  }))
                }
                className="h-10 rounded-xl border border-[#F8E9E7] bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#D65B4C]"
              >
                <option value="">{filter.allLabel ?? `Semua ${filter.label}`}</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <AdminDataTable columns={columnsWithActions} data={filteredRows} emptyMessage={emptyMessage ?? `Belum ada data ${title.toLowerCase()}.`} isLoading={isLoading} rowKey={(row) => row.id} />
        </CardContent>
      </Card>

      <Dialog open={action === "create" || action === "edit"} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border-[#F8E9E7]">
          <DialogHeader>
            <DialogTitle>{action === "create" ? `Tambah ${title}` : `Edit ${title}`}</DialogTitle>
            <DialogDescription>Isi data dengan lengkap dan jelas agar mudah dikelola.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">{fields.map(renderFormField)}</div>
          <DialogFooter>
            <Button type="button" variant="outline" className="rounded-xl border-[#F8E9E7]" onClick={closeDialog}>
              Batal
            </Button>
            <Button type="button" className="rounded-xl bg-[#D65B4C] text-white hover:bg-[#BF4E41]" onClick={handleSubmit} disabled={isSaving}>
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={action === "detail"} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="rounded-3xl border-[#F8E9E7]">
          <DialogHeader>
            <DialogTitle>Detail {title}</DialogTitle>
            <DialogDescription>Ringkasan informasi data yang dipilih.</DialogDescription>
          </DialogHeader>
          {selectedRow && (
            <div className="grid gap-3">
              {(detailFields ?? fields.map((field) => ({ label: field.label, value: (row: T) => getFormValue(row[field.key]) }))).map((field) => (
                <div key={field.label} className="rounded-2xl bg-[#F8E9E7]/45 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#822935]/60">{field.label}</p>
                  <div className="mt-1 text-sm font-medium text-slate-800">{field.value(selectedRow) ?? "-"}</div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={action === "delete"} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="rounded-3xl border-[#F8E9E7]">
          <DialogHeader>
            <DialogTitle>Hapus data?</DialogTitle>
            <DialogDescription>Tindakan ini akan menghapus data dari tampilan admin.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" className="rounded-xl border-[#F8E9E7]" onClick={closeDialog}>
              Batal
            </Button>
            <Button type="button" className="rounded-xl bg-[#822935] text-white hover:bg-[#6F2130]" onClick={handleDelete} disabled={isSaving}>
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
