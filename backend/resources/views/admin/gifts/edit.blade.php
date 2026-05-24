@extends('layouts.admin')
@section('title', 'Edit Hadiah')
@section('content')
<div class="card" style="max-width:640px">
    <div class="card-header"><h3>Edit - {{ $gift->product_name }}</h3><a href="{{ route('admin.gifts.index') }}" class="btn btn-sm btn-secondary"><i class="fas fa-arrow-left"></i> Kembali</a></div>
    <div class="card-body padded">
        <form method="POST" action="{{ route('admin.gifts.update', $gift) }}" enctype="multipart/form-data">@csrf @method('PUT')
            <div class="form-group"><label class="form-label">Nama Produk *</label><input type="text" name="product_name" class="form-control" value="{{ old('product_name', $gift->product_name) }}" required></div>
            <div class="form-group"><label class="form-label">Gambar Produk</label>
                @if($gift->image)<div style="margin-bottom:8px"><img src="{{ asset('storage/'.$gift->image) }}" style="max-width:200px;border-radius:10px;border:1px solid var(--gray-200)"></div>@endif
                <input type="file" name="image" class="form-control" accept="image/*"><p style="font-size:12px;color:var(--gray-500);margin-top:4px">Kosongkan jika tidak ingin mengubah gambar</p>
            </div>
            <div class="form-group"><label class="form-label">Deskripsi</label><textarea name="description" class="form-control">{{ old('description', $gift->description) }}</textarea></div>
            <div class="form-row">
                <div class="form-group"><label class="form-label">Harga (Rp) *</label><input type="number" name="price" class="form-control" value="{{ old('price', $gift->price) }}" min="0" required></div>
                <div class="form-group"><label class="form-label">Total Stok *</label><input type="number" name="total_stock" class="form-control" value="{{ old('total_stock', $gift->total_stock) }}" min="1" required></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label class="form-label">Warna Kartu</label><input type="color" name="color" class="form-control" value="{{ old('color', $gift->color) }}" style="height:44px;padding:4px"></div>
                <div class="form-group"><label class="form-label">Link Pembelian</label><input type="url" name="purchase_link" class="form-control" value="{{ old('purchase_link', $gift->purchase_link) }}"></div>
            </div>
            <div class="form-group"><label class="form-label">Jumlah Terbeli</label><input type="number" name="purchased_count" class="form-control" value="{{ old('purchased_count', $gift->purchased_count) }}" min="0"></div>
            <div style="display:flex;gap:10px;justify-content:flex-end;padding-top:8px"><a href="{{ route('admin.gifts.index') }}" class="btn btn-secondary">Batal</a><button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Update</button></div>
        </form>
    </div>
</div>
@endsection
