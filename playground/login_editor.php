<?php
// index.php - shows login/register form and puts a CSRF token into session
session_start();
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
$csrfToken = $_SESSION['csrf_token'];
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Secure Auth</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css">
<style>
  body { background: #0f1724; color: #e6eef8; min-height:100vh; display:flex; align-items:center; justify-content:center; }
  .card { width:100%; max-width:480px; padding:1.25rem; border-radius:12px; background: rgba(10,20,30,0.85); }
  .form-control:focus { box-shadow:none; border-color:#3b82f6; }
  .error { color:#ffb4b4; font-size:0.9rem; }
  .success { color:#bff6b9; font-size:0.95rem; }
</style>
</head>
<body>
  <div class="card">
    <h4 class="mb-3">Sign In</h4>

    <div id="alert" role="status" aria-live="polite"></div>

    <form id="authForm" autocomplete="off">
      <div class="mb-2">
        <label class="form-label">Username or Email</label>
        <input id="field_user" name="user" class="form-control" required placeholder="username or you@example.com" />
        <div id="err_user" class="error" style="display:none"></div>
      </div>

      <div class="mb-2">
        <label class="form-label">Password</label>
        <div class="input-group">
          <input id="field_password" name="password" type="password" class="form-control" required placeholder="••••••••" />
          <button id="toggle_pw" type="button" class="btn btn-outline-light" aria-label="Show password">Show</button>
        </div>
        <div id="err_password" class="error" style="display:none"></div>
      </div>

      <div class="d-flex gap-2 mb-3">
        <button id="btn_login" class="btn btn-primary" type="button">Sign In</button>
        <button id="btn_open_register" class="btn btn-outline-light" type="button">Create Account</button>
      </div>

      <hr>

      <div id="registerSection" style="display:none;">
        <h5>Create account</h5>
        <div class="mb-2">
          <label class="form-label">Username</label>
          <input id="reg_username" class="form-control" placeholder="3-30 chars (letters/numbers ._-)" />
        </div>
        <div class="mb-2">
          <label class="form-label">Email</label>
          <input id="reg_email" type="email" class="form-control" placeholder="you@example.com" />
        </div>
        <div class="mb-2">
          <label class="form-label">Password</label>
          <input id="reg_password" type="password" class="form-control" placeholder="At least 8 chars, include letters & numbers" />
        </div>
        <div class="mb-2">
          <label class="form-label">Repeat Password</label>
          <input id="reg_repeat" type="password" class="form-control" />
        </div>
        <div class="d-flex gap-2">
          <button id="btn_register" class="btn btn-success" type="button">Register</button>
          <button id="btn_cancel_register" class="btn btn-outline-light" type="button">Cancel</button>
        </div>
      </div>
    </form>
  </div>

<script>
const csrfToken = '<?php echo htmlspecialchars($csrfToken, ENT_QUOTES, "UTF-8"); ?>';

function showAlert(msg, type='error') {
  const el = document.getElementById('alert');
  el.innerHTML = `<div class="${type==='error'?'text-danger':'text-success'}">${msg}</div>`;
  setTimeout(()=>{ el.innerHTML = ''; }, 6000);
}

document.getElementById('toggle_pw').addEventListener('click', function(){
  const pw = document.getElementById('field_password');
  if (pw.type === 'password') { pw.type = 'text'; this.innerText = 'Hide'; }
  else { pw.type = 'password'; this.innerText = 'Show'; }
});

// login
document.getElementById('btn_login').addEventListener('click', async () => {
  const user = document.getElementById('field_user').value.trim();
  const password = document.getElementById('field_password').value;
  if (!user || !password) { showAlert('Please fill both fields.'); return; }

  const payload = { task: 'login', username: user, password: password };
  try {
    const r = await fetch('auth.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify(payload),
      credentials: 'same-origin'
    });
    const j = await r.json();
    if (j.ok) {
      showAlert('Login successful. Redirecting...', 'success');
      // Redirect to protected area
      setTimeout(()=> location.href = 'index_editor.php', 700);
    } else {
      showAlert(j.error || 'Login failed.');
    }
  } catch (err) {
    showAlert('Network error');
  }
});

// toggle register UI
document.getElementById('btn_open_register').addEventListener('click', () => {
  document.getElementById('registerSection').style.display = 'block';
});
document.getElementById('btn_cancel_register').addEventListener('click', () => {
  document.getElementById('registerSection').style.display = 'none';
});

// register
document.getElementById('btn_register').addEventListener('click', async () => {
  const username = document.getElementById('reg_username').value.trim();
  const email = document.getElementById('reg_email').value.trim();
  const password = document.getElementById('reg_password').value;
  const repeat = document.getElementById('reg_repeat').value;
  if (!username || !email || !password || !repeat) { showAlert('Please fill all registration fields.'); return; }
  if (password !== repeat) { showAlert('Passwords do not match.'); return; }
  // basic client-side checks
  if (password.length < 8) { showAlert('Password must be at least 8 characters.'); return; }

  const payload = { task: 'register', username, emailAddress: email, password, repeatpassword: repeat };
  try {
    const r = await fetch('auth.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      credentials: 'same-origin',
      body: JSON.stringify(payload)
    });
    const j = await r.json();
    if (j.ok) {
      showAlert(j.message || 'Registered', 'success');
      document.getElementById('registerSection').style.display = 'none';
    } else {
      showAlert(j.error || 'Registration failed.');
    }
  } catch (err) {
    showAlert('Network error');
  }
});
</script>
</body>
</html>
