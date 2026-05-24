import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Gift, PackageCheck, PackageOpen, WalletCards } from "lucide-react";
import { AdminResourcePage, type AdminResourceField } from "@/components/admin/admin-resource-page";
import { type AdminDataTableColumn } from "@/components/admin/admin-data-table";
import { api, type AdminGift } from "@/lib/api";

const DEFAULT_GIFT_IMAGE = "/images/CMZ_4069.jpg";

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const formatCurrency = (value: number | null) => (typeof value === "number" ? new Intl.NumberFormat("id-ID", { currency: "IDR", style: "currency", maximumFractionDigits: 0 }).format(value) : "-");

const getStatusMeta = (status: string) => {
  if (status === "fully_claimed") return { label: "Habis", className: "bg-rose-50 text-rose-700 ring-rose-200" };
  if (status === "partially_claimed") return { label: "Diklaim Sebagian", className: "bg-amber-50 text-amber-700 ring-amber-200" };
  return { label: "Tersedia", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" };
};

export function GiftsPage() {
  const queryClient = useQueryClient();
  const { data: gifts, isLoading } = useQuery({
    queryKey: ["admin-gifts"],
    queryFn: api.adminGifts,
  });

  const rows = gifts ?? [];
  const availableCount = rows.filter((gift) => gift.availability_status === "available").length;
  const claimedCount = rows.filter((gift) => gift.availability_status === "fully_claimed").length;
  const totalValue = rows.reduce((total, gift) => total + Number(gift.price || 0), 0);

  const columns: AdminDataTableColumn<AdminGift>[] = [
    {
      header: "Hadiah",
      cell: (gift) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-2xl bg-[#F8E9E7]">
            <img src={gift.image || DEFAULT_GIFT_IMAGE} alt={gift.product_name} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-900">{gift.product_name}</p>
            <p className="line-clamp-2 max-w-md text-xs leading-5 text-slate-500">{gift.description || "-"}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Estimasi",
      cell: (gift) => <span className="font-semibold text-slate-900">{formatCurrency(gift.price)}</span>,
    },
    {
      header: "Stok",
      cell: (gift) => `${gift.purchased_count}/${gift.total_stock}`,
    },
    {
      header: "Status",
      cell: (gift) => {
        const status = getStatusMeta(gift.availability_status);
        return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${status.className}`}>{status.label}</span>;
      },
    },
    {
      header: "Diklaim Oleh",
      cell: (gift) => <span className="text-sm text-slate-500">{gift.claimed_by || "-"}</span>,
    },
  ];

  const fields: AdminResourceField<AdminGift>[] = [
    { key: "product_name", label: "Nama Hadiah", required: true, placeholder: "Nama produk" },
    { key: "image", label: "Upload Gambar", type: "file", required: false },
    { key: "description", label: "Deskripsi", type: "textarea", placeholder: "Deskripsi singkat hadiah" },
    { key: "purchase_link", label: "Link Pembelian", type: "url", placeholder: "https://..." },
    { key: "price", label: "Harga", type: "number", required: true, defaultValue: "0" },
    { key: "color", label: "Warna Kartu", placeholder: "#D65B4C", defaultValue: "#D65B4C" },
    { key: "total_stock", label: "Total Stok", type: "number", required: true, defaultValue: "1" },
    { key: "purchased_count", label: "Jumlah Diklaim", type: "number", defaultValue: "0" },
  ];

  return (
    <AdminResourcePage
      title="Gifts & Banks"
      description="Kelola rekomendasi hadiah, stok, link pembelian, dan status klaim dari tamu."
      icon={Gift}
      data={rows}
      isLoading={isLoading}
      columns={columns}
      fields={fields}
      searchPlaceholder="Cari nama hadiah, deskripsi, atau penerima..."
      emptyMessage="Belum ada data hadiah."
      getSearchText={(gift) => `${gift.product_name} ${gift.description ?? ""} ${gift.claimed_by ?? ""}`}
      filters={[
        {
          key: "status",
          label: "Status",
          options: [
            { label: "Tersedia", value: "available" },
            { label: "Diklaim Sebagian", value: "partially_claimed" },
            { label: "Habis", value: "fully_claimed" },
          ],
          match: (gift, value) => gift.availability_status === value,
        },
      ]}
      stats={[
        { title: "Total Hadiah", value: rows.length, description: "Item rekomendasi hadiah.", icon: Gift, tone: "coral" },
        { title: "Tersedia", value: availableCount, description: "Masih bisa dipilih tamu.", icon: PackageOpen, tone: "green" },
        { title: "Habis", value: claimedCount, description: "Sudah diklaim penuh.", icon: PackageCheck, tone: "rose" },
        { title: "Total Estimasi", value: formatCurrency(totalValue), description: "Akumulasi estimasi harga.", icon: WalletCards, tone: "blue" },
      ]}
      createItem={async (form) => {
        const item = await api.createAdminGift(form);
        queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
        return item;
      }}
      updateItem={async (row, form) => {
        const item = await api.updateAdminGift(row.id, form);
        queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
        return item;
      }}
      deleteItem={async (row) => {
        await api.deleteAdminGift(row.id);
        queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
      }}
      detailFields={[
        { label: "Nama Hadiah", value: (gift) => gift.product_name },
        { label: "Deskripsi", value: (gift) => gift.description || "-" },
        { label: "Harga", value: (gift) => formatCurrency(gift.price) },
        { label: "Status", value: (gift) => getStatusMeta(gift.availability_status).label },
        { label: "Stok", value: (gift) => `${gift.purchased_count}/${gift.total_stock}` },
        { label: "Diklaim Oleh", value: (gift) => gift.claimed_by || "-" },
        { label: "Link Pembelian", value: (gift) => gift.purchase_link || "-" },
        { label: "Dibuat", value: (gift) => formatDateTime(gift.created_at) },
      ]}
    />
  );
}
