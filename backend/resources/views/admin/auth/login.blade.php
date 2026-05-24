<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Hera & Taufik Admin</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">
    <style>
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#842434 0%,#6A1D2A 50%,#4A1520 100%);padding:20px;position:relative;overflow:hidden}
        body::before{content:'✽';position:absolute;top:10%;left:5%;font-size:120px;color:rgba(198,166,51,0.06);animation:spin 20s linear infinite}
        body::after{content:'✽';position:absolute;bottom:10%;right:5%;font-size:160px;color:rgba(249,233,231,0.04);animation:spin 25s linear infinite reverse}
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        .login-card{background:#fff;border-radius:24px;padding:48px 40px;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(0,0,0,0.3);position:relative;z-index:1}
        .login-brand{text-align:center;margin-bottom:36px}
        .login-brand .icon{width:56px;height:56px;background:linear-gradient(135deg,#C6A633,#E5C158);border-radius:14px;display:inline-flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-weight:700;font-size:22px;color:#6A1D2A;margin-bottom:16px;box-shadow:0 4px 15px rgba(198,166,51,0.3)}
        .login-brand h1{font-family:'Playfair Display',serif;font-size:24px;color:#842434;margin-bottom:4px}
        .login-brand p{font-size:13px;color:#ADB5BD}
        .form-group{margin-bottom:20px}
        .form-label{display:block;font-size:13px;font-weight:600;color:#495057;margin-bottom:6px}
        .form-control{width:100%;padding:12px 14px;border:1.5px solid #DEE2E6;border-radius:10px;font-size:14px;font-family:'Inter',sans-serif;transition:all 0.3s;background:#fff;color:#343A40}
        .form-control:focus{outline:none;border-color:#842434;box-shadow:0 0 0 3px rgba(132,36,52,0.1)}
        .remember-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}
        .remember-row label{display:flex;align-items:center;gap:8px;font-size:13px;color:#6C757D;cursor:pointer}
        .remember-row input[type="checkbox"]{width:16px;height:16px;accent-color:#842434}
        .btn-login{width:100%;padding:14px;background:linear-gradient(135deg,#842434,#6A1D2A);color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.3s;font-family:'Inter',sans-serif;letter-spacing:0.3px}
        .btn-login:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(132,36,52,0.4)}
        .btn-login:active{transform:translateY(0)}
        .error-msg{background:rgba(220,53,69,0.1);color:#DC3545;padding:12px 14px;border-radius:10px;font-size:13px;margin-bottom:20px;border:1px solid rgba(220,53,69,0.2)}
        .login-footer{text-align:center;margin-top:24px;font-size:12px;color:#ADB5BD}
    </style>
</head>
<body>
    <div class="login-card">
        <div class="login-brand">
            <div class="icon">H&T</div>
            <h1>Wedding Admin</h1>
            <p>Masuk ke dashboard admin</p>
        </div>
        @if($errors->any())
            <div class="error-msg">{{ $errors->first() }}</div>
        @endif
        <form method="POST" action="{{ route('admin.login.submit') }}">
            @csrf
            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" name="email" class="form-control" placeholder="admin@herataufik.com" value="{{ old('email') }}" required autofocus>
            </div>
            <div class="form-group">
                <label class="form-label">Password</label>
                <input type="password" name="password" class="form-control" placeholder="••••••••" required>
            </div>
            <div class="remember-row">
                <label><input type="checkbox" name="remember"> Ingat saya</label>
            </div>
            <button type="submit" class="btn-login">Masuk</button>
        </form>
        <div class="login-footer">© 2026 Hera & Taufik Wedding</div>
    </div>
</body>
</html>
