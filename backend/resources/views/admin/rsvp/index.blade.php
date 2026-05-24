@extends('layouts.admin')
@section('title', 'RSVP Management')
@section('content')
<div class="stat-grid">
    <div class="stat-card maroon"><div class="stat-icon"><i class="fas fa-envelope"></i></div><div class="stat-value">{{ $stats['total_submissions'] }}</div><div class="stat-label">Total RSVP</div></div>
    <div class="stat-card green"><div class="stat-icon"><i class="fas fa-user-check"></i></div><div class="stat-value">{{ $stats['total_attending'] }}</div><div class="stat-label">Hadir</div></div>
    <div class="stat-card rose"><div class="stat-icon"><i class="fas fa-user-times"></i></div><div class="stat-value">{{ $stats['total_not_attending'] }}</div><div class="stat-label">Tidak Hadir</div></div>
    <div class="stat-card gold"><div class="stat-icon"><i class="fas fa-users"></i></div><div class="stat-value">{{ $stats['total_guests'] }}</div><div class="stat-label">Total Undangan</div></div>
</div>
<div class="card">
    <div class="card-header">
        <h3>Daftar RSVP</h3>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <form method="GET" class="filter-bar" style="margin:0">
                <div class="search-input"><i class="fas fa-search"></i><input type="text" name="search" class="form-control" placeholder="Cari nama tamu..." value="{{ $filters['search'] ?? '' }}" style="padding-left:38px"></div>
                <select name="status" class="form-control" style="width:auto;min-width:150px" onchange="this.form.submit()">
                    <option value="">Semua Status</option>
                    <option value="attending" {{ ($filters['status'] ?? '') === 'attending' ? 'selected' : '' }}>Hadir</option>
                    <option value="not_attending" {{ ($filters['status'] ?? '') === 'not_attending' ? 'selected' : '' }}>Tidak Hadir</option>
                </select>
                <button type="submit" class="btn btn-sm btn-secondary"><i class="fas fa-filter"></i> Filter</button>
            </form>
            <a href="{{ route('admin.rsvp.create') }}" class="btn btn-sm btn-primary"><i class="fas fa-plus"></i> Tambah</a>
        </div>
    </div>
    <div class="card-body"><div class="table-wrapper">
        <table>
            <thead><tr><th>#</th><th>Nama Tamu</th><th>Status</th><th>Acara</th><th>Jumlah</th><th>Telepon</th><th>Waktu</th><th>Aksi</th></tr></thead>
            <tbody>
            @forelse($rsvps as $i => $rsvp)
                <tr>
                    <td>{{ $rsvps->firstItem() + $i }}</td>
                    <td><strong>{{ $rsvp->guest_name }}</strong></td>
                    <td>@if($rsvp->attendance_status === 'attending')<span class="badge badge-success">Hadir</span>@else<span class="badge badge-danger">Tidak Hadir</span>@endif</td>
                    <td>@if($rsvp->events)@foreach($rsvp->events as $ev)<span class="badge badge-info" style="margin:2px">{{ ucfirst(str_replace('_',' ',$ev)) }}</span>@endforeach @else - @endif</td>
                    <td>{{ $rsvp->total_attendees }}</td>
                    <td>{{ $rsvp->phone_number ?? '-' }}</td>
                    <td style="font-size:13px;color:var(--gray-500)">{{ $rsvp->created_at->format('d M Y H:i') }}</td>
                    <td>
                        <div style="display:flex;gap:4px">
                            <a href="{{ route('admin.rsvp.show', $rsvp) }}" class="btn btn-sm btn-icon btn-secondary" title="Detail"><i class="fas fa-eye"></i></a>
                            <a href="{{ route('admin.rsvp.edit', $rsvp) }}" class="btn btn-sm btn-icon btn-secondary" title="Edit"><i class="fas fa-edit"></i></a>
                            <form id="delete-rsvp-{{ $rsvp->id }}" action="{{ route('admin.rsvp.destroy', $rsvp) }}" method="POST" style="margin:0">@csrf @method('DELETE')</form>
                            <button class="btn btn-sm btn-icon btn-danger" onclick="confirmDelete('delete-rsvp-{{ $rsvp->id }}')" title="Hapus"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            @empty
                <tr><td colspan="8"><div class="empty-state"><i class="fas fa-inbox"></i><p>Belum ada data RSVP</p></div></td></tr>
            @endforelse
            </tbody>
        </table>
    </div></div>
    @if($rsvps->hasPages())
    <div class="pagination-wrapper">
        <div class="pagination-info">Menampilkan {{ $rsvps->firstItem() }}-{{ $rsvps->lastItem() }} dari {{ $rsvps->total() }}</div>
        <div class="pagination">{{ $rsvps->links() }}</div>
    </div>
    @endif
</div>
@endsection
