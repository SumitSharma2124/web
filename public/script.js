function logout() {
  localStorage.clear();
  const userEmail = document.getElementById('userEmail');
  if (userEmail) {
    userEmail.textContent = '';
  }
  const userIcon = document.getElementById('userIcon');
  if (userIcon) {
    userIcon.classList.remove('logged-in');
  }
  window.location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
  const userEmail = localStorage.getItem('user-email');
  const userEmailEl = document.getElementById('userEmail');
  const userIcon = document.getElementById('userIcon');
  
  if (userEmail && userEmailEl) {
    userEmailEl.textContent = userEmail;
  }
  
  if (userEmail && userIcon) {
    userIcon.classList.add('logged-in');
  }
  
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      
      if (email && password) {
        localStorage.setItem('user-email', email);
        document.getElementById('auth-toggle').checked = false;
        window.location.reload();
      }
    });
  }
  
  const signupBtn = document.getElementById('signupBtn');
  if (signupBtn) {
    signupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;
      const username = document.getElementById('username').value;
      
      if (email && password && username) {
        localStorage.setItem('user-email', email);
        localStorage.setItem('user-name', username);
        document.getElementById('auth-toggle').checked = false;
        window.location.reload();
      }
    });
  }
});
