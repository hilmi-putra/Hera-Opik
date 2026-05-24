<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Dashboard') - Hera & Taufik Admin</title>
    <link rel="icon" type="image/png" href="{{ asset('icon.png') }}">
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}">
    @stack('styles')
</head>

<body>
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-brand">
            <img src="{{ asset('icon.png') }}" alt="Hera & Taufik" class="brand-icon">
            <div class="brand-text">
                <h2>Hera & Taufik</h2>
                <p>Wedding Admin</p>
            </div>
        </div>
        <nav class="sidebar-nav">
            <div class="nav-section">
                <div class="nav-section-title">Main Menu</div>
                <a href="{{ route('admin.dashboard') }}"
                    class="nav-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                    <i class="fas fa-th-large"></i> Dashboard
                </a>
            </div>
            <div class="nav-section">
                <div class="nav-section-title">Management</div>
                <a href="{{ route('admin.rsvp.index') }}"
                    class="nav-link {{ request()->routeIs('admin.rsvp.*') ? 'active' : '' }}">
                    <i class="fas fa-envelope-open-text"></i> RSVP
                </a>
                <a href="{{ route('admin.gifts.index') }}"
                    class="nav-link {{ request()->routeIs('admin.gifts.*') ? 'active' : '' }}">
                    <i class="fas fa-gift"></i> Gift Recommendations
                </a>
            </div>
        </nav>
        <div class="sidebar-footer">
            <div class="user-info">
                <div class="avatar">{{ substr(Auth::user()->name ?? 'A', 0, 1) }}</div>
                <div class="user-details">
                    <p>{{ Auth::user()->name ?? 'Admin' }}</p>
                    <span>Administrator</span>
                </div>
            </div>
        </div>
    </aside>
    <div class="main-content">
        <header class="topbar">
            <div class="topbar-left">
                <button class="mobile-toggle" onclick="document.getElementById('sidebar').classList.toggle('open')"><i
                        class="fas fa-bars"></i></button>
                <h1>@yield('title', 'Dashboard')</h1>
            </div>
            <div class="topbar-right">
                <form action="{{ route('admin.logout') }}" method="POST" style="margin:0;">@csrf
                    <button type="submit" class="btn-logout"><i class="fas fa-sign-out-alt"></i> Logout</button>
                </form>
            </div>
        </header>
        <div class="page-content">
            @if (session('success'))
                <div class="alert alert-success"><i class="fas fa-check-circle"></i> {{ session('success') }}</div>
            @endif
            @if (session('error'))
                <div class="alert alert-error"><i class="fas fa-exclamation-circle"></i> {{ session('error') }}</div>
            @endif
            @yield('content')
        </div>
    </div>
    <script>
        document.addEventListener('click', function(e) {
            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth <= 768 && sidebar.classList.contains('open') && !sidebar.contains(e.target) && !e
                .target.classList.contains('mobile-toggle')) {
                sidebar.classList.remove('open');
            }
        });

        function confirmDelete(formId) {
            if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
                document.getElementById(formId).submit();
            }
        }
    </script>
    @stack('scripts')
</body>

</html>
