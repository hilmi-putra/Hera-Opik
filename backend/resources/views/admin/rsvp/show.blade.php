@extends('layouts.admin')
@section('title', 'Detail RSVP')
@section('content')
<div class="card" style="max-width:640px">
    <div class="card-header"><h3>Detail RSVP</h3><div style="display:flex;gap:8px"><a href="{{ route('admin.rsvp.edit', $rsvp) }}" class="btn btn-sm btn-primary"><i class="fas fa-edit"></i> Edit</a><a href="{{ route('admin.rsvp.index') }}" class="btn btn-sm btn-secondary"><i class="fas fa-arrow-left"></i> Kembali</a></div></div>
    <div class="card-body padded">
        <div style="display:grid;gap:16px">
            <div><div class="form-label">Nama Tamu</div><p style="font-size:16px;font-weight:600">{{ $rsvp->guest_name }}</p></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                <div><div class="form-label">Status</div>@if($rsvp->attendance_status === 'attending')<span class="badge badge-success" style="font-size:14px;padding:6px 14px">Hadir</span>@else<span class="badge badge-danger" style="font-size:14px;padding:6px 14px">Tidak Hadir</span>@endif</div>
                <div><div class="form-label">Jumlah Tamu</div><p style="font-size:16px;font-weight:600">{{ $rsvp->total_attendees }} orang</p></div>
            </div>
            <div><div class="form-label">Acara</div>@if($rsvp->events)@foreach($rsvp->events as $ev)<span class="badge badge-info" style="margin-right:6px;font-size:13px;padding:5px 12px">{{ ucfirst(str_replace('_',' ',$ev)) }}</span>@endforeach @else<span style="color:var(--gray-400)">Tidak ada</span>@endif</div>
            <div><div class="form-label">No. Telepon</div><p>{{ $rsvp->phone_number ?? '-' }}</p></div>
            <div><div class="form-label">Pesan / Catatan</div><p style="background:var(--cream-light);padding:14px;border-radius:10px;font-style:italic;line-height:1.6">{{ $rsvp->notes ?? 'Tidak ada pesan' }}</p></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;padding-top:8px;border-top:1px solid var(--gray-100)">
                <div><div class="form-label">Dibuat</div><p style="font-size:13px;color:var(--gray-500)">{{ $rsvp->created_at->format('d M Y, H:i') }}</p></div>
                <div><div class="form-label">Diperbarui</div><p style="font-size:13px;color:var(--gray-500)">{{ $rsvp->updated_at->format('d M Y, H:i') }}</p></div>
            </div>
        </div>
    </div>
</div>
@endsection
