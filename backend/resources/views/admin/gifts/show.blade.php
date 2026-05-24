@extends('layouts.admin')
@section('title', 'Detail Hadiah')
@section('content')
<div class="card" style="max-width:640px">
    <div class="card-header"><h3>Detail Hadiah</h3><div style="display:flex;gap:8px"><a href="{{ route('admin.gifts.edit', $gift) }}" class="btn btn-sm btn-primary"><i class="fas fa-edit"></i> Edit</a><a href="{{ route('admin.gifts.index') }}" class="btn btn-sm btn-secondary"><i class="fas fa-arrow-left"></i> Kembali</a></div></div>
    <div class="card-body padded">
        <div style="display:grid;gap:16px">
            @if($gift->image)<div><img src="{{ asset('storage/'.$gift->image) }}" style="max-width:100%;border-radius:12px;border:1px solid var(--gray-200)"></div>@endif
            <div style="display:flex;align-items:center;gap:12px"><span class="color-dot" style="background:{{ $gift->color }};width:32px;height:32px"></span><div><div style="font-size:20px;font-weight:700">{{ $gift->product_name }}</div><div style="color:var(--gray-500);font-size:13px">{{ $gift->description }}</div></div></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                <div><div class="form-label">Harga</div><p style="font-size:18px;font-weight:700;color:var(--maroon)">Rp {{ number_format($gift->price, 0, ',', '.') }}</p></div>
                <div><div class="form-label">Status</div>@if($gift->availability_status === 'available')<span class="badge badge-success" style="font-size:13px;padding:5px 12px">Tersedia</span>@elseif($gift->availability_status === 'partially_claimed')<span class="badge badge-warning" style="font-size:13px;padding:5px 12px">Sebagian Diklaim</span>@else<span class="badge badge-danger" style="font-size:13px;padding:5px 12px">Sepenuhnya Diklaim</span>@endif</div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                <div><div class="form-label">Total Stok</div><p style="font-weight:600">{{ $gift->total_stock }}</p></div>
                <div><div class="form-label">Terjual</div><p style="font-weight:600">{{ $gift->purchased_count }}</p></div>
            </div>
            @if($gift->purchase_link)<div><div class="form-label">Link Pembelian</div><a href="{{ $gift->purchase_link }}" target="_blank" style="color:var(--maroon);font-weight:500">{{ $gift->purchase_link }} <i class="fas fa-external-link-alt" style="font-size:11px"></i></a></div>@endif
            @if($gift->claimed_by)<div style="background:var(--cream-light);padding:16px;border-radius:10px"><div class="form-label">Info Pembeli</div><p><strong>{{ $gift->claimed_by }}</strong></p>@if($gift->claimed_phone)<p style="font-size:13px;color:var(--gray-600)">{{ $gift->claimed_phone }}</p>@endif @if($gift->claimed_email)<p style="font-size:13px;color:var(--gray-600)">{{ $gift->claimed_email }}</p>@endif</div>@endif
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;padding-top:8px;border-top:1px solid var(--gray-100)">
                <div><div class="form-label">Dibuat</div><p style="font-size:13px;color:var(--gray-500)">{{ $gift->created_at->format('d M Y, H:i') }}</p></div>
                <div><div class="form-label">Diperbarui</div><p style="font-size:13px;color:var(--gray-500)">{{ $gift->updated_at->format('d M Y, H:i') }}</p></div>
            </div>
        </div>
    </div>
</div>
@endsection
