@extends('layouts.admin')
@section('title', 'Tambah RSVP')
@section('content')
<div class="card" style="max-width:640px">
    <div class="card-header"><h3>Form RSVP Baru</h3><a href="{{ route('admin.rsvp.index') }}" class="btn btn-sm btn-secondary"><i class="fas fa-arrow-left"></i> Kembali</a></div>
    <div class="card-body padded">
        <form method="POST" action="{{ route('admin.rsvp.store') }}">@csrf
            <div class="form-group"><label class="form-label">Nama Tamu *</label><input type="text" name="guest_name" class="form-control" value="{{ old('guest_name') }}" required>@error('guest_name')<div class="form-error">{{ $message }}</div>@enderror</div>
            <div class="form-row">
                <div class="form-group"><label class="form-label">Status Kehadiran *</label><select name="attendance_status" class="form-control" required><option value="attending" {{ old('attendance_status') === 'attending' ? 'selected' : '' }}>Hadir</option><option value="not_attending" {{ old('attendance_status') === 'not_attending' ? 'selected' : '' }}>Tidak Hadir</option></select></div>
                <div class="form-group"><label class="form-label">Jumlah Tamu</label><input type="number" name="total_attendees" class="form-control" value="{{ old('total_attendees', 1) }}" min="1" max="10"></div>
            </div>
            <div class="form-group"><label class="form-label">Acara</label>
                <div style="display:flex;gap:16px;margin-top:4px">
                    <label style="display:flex;align-items:center;gap:6px;font-size:14px;cursor:pointer"><input type="checkbox" name="events[]" value="akad_nikah" {{ in_array('akad_nikah', old('events', [])) ? 'checked' : '' }}> Akad Nikah</label>
                    <label style="display:flex;align-items:center;gap:6px;font-size:14px;cursor:pointer"><input type="checkbox" name="events[]" value="resepsi" {{ in_array('resepsi', old('events', [])) ? 'checked' : '' }}> Resepsi</label>
                </div>
            </div>
            <div class="form-group"><label class="form-label">No. Telepon</label><input type="text" name="phone_number" class="form-control" value="{{ old('phone_number') }}" placeholder="08xxxxxxxxxx"></div>
            <div class="form-group"><label class="form-label">Pesan / Catatan</label><textarea name="notes" class="form-control" placeholder="Ucapan atau pesan...">{{ old('notes') }}</textarea></div>
            <div style="display:flex;gap:10px;justify-content:flex-end;padding-top:8px"><a href="{{ route('admin.rsvp.index') }}" class="btn btn-secondary">Batal</a><button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Simpan</button></div>
        </form>
    </div>
</div>
@endsection
