@extends('layouts.admin')
@section('title', 'Gift Recommendations')
@section('content')
<div class="stat-grid">
    <div class="stat-card green"><div class="stat-icon"><i class="fas fa-gift"></i></div><div class="stat-value">{{ $stats['total_gifts'] }}</div><div class="stat-label">Total Hadiah</div></div>
    <div class="stat-card gold"><div class="stat-icon"><i class="fas fa-box-open"></i></div><div class="stat-value">{{ $stats['available'] }}</div><div class="stat-label">Tersedia</div></div>
    <div class="stat-card rose"><div class="stat-icon"><i class="fas fa-hand-holding-heart"></i></div><div class="stat-value">{{ $stats['partially_claimed'] }}</div><div class="stat-label">Sebagian Diklaim</div></div>
    <div class="stat-card maroon"><div class="stat-icon"><i class="fas fa-check-double"></i></div><div class="stat-value">{{ $stats['fully_claimed'] }}</div><div class="stat-label">Sepenuhnya Diklaim</div></div>
</div>
<div class="card">
    <div class="card-header">
        <h3>Daftar Hadiah</h3>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <form method="GET" class="filter-bar" style="margin:0">
                <div class="search-input"><i class="fas fa-search"></i><input type="text" name="search" class="form-control" placeholder="Cari produk..." value="{{ $filters['search'] ?? '' }}" style="padding-left:38px"></div>
                <select name="status" class="form-control" style="width:auto;min-width:160px" onchange="this.form.submit()">
                    <option value="">Semua Status</option>
                    <option value="available" {{ ($filters['status'] ?? '') === 'available' ? 'selected' : '' }}>Tersedia</option>
                    <option value="partially_claimed" {{ ($filters['status'] ?? '') === 'partially_claimed' ? 'selected' : '' }}>Sebagian Diklaim</option>
                    <option value="fully_claimed" {{ ($filters['status'] ?? '') === 'fully_claimed' ? 'selected' : '' }}>Sepenuhnya Diklaim</option>
                </select>
                <button type="submit" class="btn btn-sm btn-secondary"><i class="fas fa-filter"></i></button>
            </form>
            <a href="{{ route('admin.gifts.create') }}" class="btn btn-sm btn-primary"><i class="fas fa-plus"></i> Tambah</a>
        </div>
    </div>
    <div class="card-body"><div class="table-wrapper">
        <table>
            <thead><tr><th>#</th><th>Warna</th><th>Nama Produk</th><th>Harga</th><th>Stok</th><th>Terjual</th><th>Status</th><th>Diklaim Oleh</th><th>Aksi</th></tr></thead>
            <tbody>
            @forelse($gifts as $i => $gift)
                <tr>
                    <td>{{ $gifts->firstItem() + $i }}</td>
                    <td><span class="color-dot" style="background:{{ $gift->color }}"></span></td>
                    <td><strong>{{ $gift->product_name }}</strong><br><span style="font-size:12px;color:var(--gray-500)">{{ Str::limit($gift->description, 40) }}</span></td>
                    <td>Rp {{ number_format($gift->price, 0, ',', '.') }}</td>
                    <td>{{ $gift->total_stock }}</td>
                    <td>{{ $gift->purchased_count }}</td>
                    <td>
                        @if($gift->availability_status === 'available')<span class="badge badge-success">Tersedia</span>
                        @elseif($gift->availability_status === 'partially_claimed')<span class="badge badge-warning">Sebagian</span>
                        @else<span class="badge badge-danger">Habis</span>@endif
                    </td>
                    <td>{{ $gift->claimed_by ?? '-' }}</td>
                    <td>
                        <div style="display:flex;gap:4px">
                            <a href="{{ route('admin.gifts.show', $gift) }}" class="btn btn-sm btn-icon btn-secondary" title="Detail"><i class="fas fa-eye"></i></a>
                            <a href="{{ route('admin.gifts.edit', $gift) }}" class="btn btn-sm btn-icon btn-secondary" title="Edit"><i class="fas fa-edit"></i></a>
                            <form id="delete-gift-{{ $gift->id }}" action="{{ route('admin.gifts.destroy', $gift) }}" method="POST" style="margin:0">@csrf @method('DELETE')</form>
                            <button class="btn btn-sm btn-icon btn-danger" onclick="confirmDelete('delete-gift-{{ $gift->id }}')" title="Hapus"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            @empty
                <tr><td colspan="9"><div class="empty-state"><i class="fas fa-gift"></i><p>Belum ada data hadiah</p></div></td></tr>
            @endforelse
            </tbody>
        </table>
    </div></div>
    @if($gifts->hasPages())
    <div class="pagination-wrapper">
        <div class="pagination-info">Menampilkan {{ $gifts->firstItem() }}-{{ $gifts->lastItem() }} dari {{ $gifts->total() }}</div>
        <div class="pagination">{{ $gifts->links() }}</div>
    </div>
    @endif
</div>
@endsection
