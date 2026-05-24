@extends('layouts.admin')
@section('title', 'Tambah Hadiah')
@section('content')
<div class="card" style="max-width:640px">
    <div class="card-header"><h3>Form Hadiah Baru</h3><a href="{{ route('admin.gifts.index') }}" class="btn btn-sm btn-secondary"><i class="fas fa-arrow-left"></i> Kembali</a></div>
    <div class="card-body padded">
        <form method="POST" action="{{ route('admin.gifts.store') }}" enctype="multipart/form-data">@csrf
            <div class="form-group"><label class="form-label">Nama Produk *</label><input type="text" name="product_name" class="form-control" value="{{ old('product_name') }}" required>@error('product_name')<div class="form-error">{{ $message }}</div>@enderror</div>
            <div class="form-group"><label class="form-label">Gambar Produk</label><input type="file" name="image" class="form-control" accept="image/*">@error('image')<div class="form-error">{{ $message }}</div>@enderror</div>
            <div class="form-group"><label class="form-label">Deskripsi</label><textarea name="description" class="form-control" placeholder="Deskripsi singkat produk...">{{ old('description') }}</textarea></div>
            <div class="form-row">
                <div class="form-group"><label class="form-label">Harga (Rp) *</label><input type="number" name="price" class="form-control" value="{{ old('price') }}" min="0" required>@error('price')<div class="form-error">{{ $message }}</div>@enderror</div>
                <div class="form-group"><label class="form-label">Total Stok *</label><input type="number" name="total_stock" class="form-control" value="{{ old('total_stock', 1) }}" min="1" required></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label class="form-label">Warna Kartu</label><input type="color" name="color" class="form-control" value="{{ old('color', '#D34D41') }}" style="height:44px;padding:4px"></div>
                <div class="form-group"><label class="form-label">Link Pembelian</label><input type="url" name="purchase_link" class="form-control" value="{{ old('purchase_link') }}" placeholder="https://..."></div>
            </div>
            <div style="display:flex;gap:10px;justify-content:flex-end;padding-top:8px"><a href="{{ route('admin.gifts.index') }}" class="btn btn-secondary">Batal</a><button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Simpan</button></div>
        </form>
    </div>
</div>
@endsection
