@extends('layouts.admin')
@section('title', 'Dashboard')
@section('content')
<div class="stat-grid">
    <div class="stat-card maroon">
        <div class="stat-icon"><i class="fas fa-envelope-open-text"></i></div>
        <div class="stat-value">{{ $rsvpStats['total_submissions'] }}</div>
        <div class="stat-label">Total RSVP</div>
    </div>
    <div class="stat-card green">
        <div class="stat-icon"><i class="fas fa-user-check"></i></div>
        <div class="stat-value">{{ $rsvpStats['total_attending'] }}</div>
        <div class="stat-label">Tamu Hadir</div>
    </div>
    <div class="stat-card rose">
        <div class="stat-icon"><i class="fas fa-user-times"></i></div>
        <div class="stat-value">{{ $rsvpStats['total_not_attending'] }}</div>
        <div class="stat-label">Tidak Hadir</div>
    </div>
    <div class="stat-card gold">
        <div class="stat-icon"><i class="fas fa-users"></i></div>
        <div class="stat-value">{{ $rsvpStats['total_guests'] }}</div>
        <div class="stat-label">Total Undangan</div>
    </div>
</div>
<div class="stat-grid">
    <div class="stat-card green">
        <div class="stat-icon"><i class="fas fa-gift"></i></div>
        <div class="stat-value">{{ $giftStats['total_gifts'] }}</div>
        <div class="stat-label">Total Hadiah</div>
    </div>
    <div class="stat-card gold">
        <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
        <div class="stat-value">{{ $giftStats['available'] }}</div>
        <div class="stat-label">Tersedia</div>
    </div>
    <div class="stat-card maroon">
        <div class="stat-icon"><i class="fas fa-shopping-bag"></i></div>
        <div class="stat-value">{{ $giftStats['fully_claimed'] }}</div>
        <div class="stat-label">Sudah Diklaim</div>
    </div>
    <div class="stat-card rose">
        <div class="stat-icon"><i class="fas fa-money-bill-wave"></i></div>
        <div class="stat-value">Rp {{ number_format($giftStats['total_value'], 0, ',', '.') }}</div>
        <div class="stat-label">Total Nilai Hadiah</div>
    </div>
</div>
<div class="card">
    <div class="card-header">
        <h3><i class="fas fa-clock" style="margin-right:8px;color:var(--gold)"></i>RSVP Terbaru</h3>
        <a href="{{ route('admin.rsvp.index') }}" class="btn btn-sm btn-secondary">Lihat Semua</a>
    </div>
    <div class="card-body">
        <div class="table-wrapper">
            <table>
                <thead><tr><th>Nama Tamu</th><th>Status</th><th>Acara</th><th>Jumlah</th><th>Waktu</th></tr></thead>
                <tbody>
                @forelse($recentRsvps as $rsvp)
                    <tr>
                        <td><strong>{{ $rsvp->guest_name }}</strong></td>
                        <td>
                            @if($rsvp->attendance_status === 'attending')
                                <span class="badge badge-success">Hadir</span>
                            @else
                                <span class="badge badge-danger">Tidak Hadir</span>
                            @endif
                        </td>
                        <td>
                            @if($rsvp->events)
                                @foreach($rsvp->events as $event)
                                    <span class="badge badge-info" style="margin-right:4px">{{ str_replace('_', ' ', ucfirst($event)) }}</span>
                                @endforeach
                            @else <span style="color:var(--gray-400)">-</span> @endif
                        </td>
                        <td>{{ $rsvp->total_attendees }} orang</td>
                        <td style="color:var(--gray-500);font-size:13px">{{ $rsvp->created_at->diffForHumans() }}</td>
                    </tr>
                @empty
                    <tr><td colspan="5"><div class="empty-state"><i class="fas fa-inbox"></i><p>Belum ada RSVP</p></div></td></tr>
                @endforelse
                </tbody>
            </table>
        </div>
    </div>
    @if($recentRsvps->hasPages())
    <div class="pagination-wrapper">
        <div class="pagination-info">Menampilkan {{ $recentRsvps->firstItem() }}-{{ $recentRsvps->lastItem() }} dari {{ $recentRsvps->total() }}</div>
        <div class="pagination">{{ $recentRsvps->links() }}</div>
    </div>
    @endif
</div>
@endsection
