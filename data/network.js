export function updateOnlineStatus() {
    if (!navigator.onLine) {
      document.body.innerHTML = '<h4 style="color: orange; text-align: center; padding: 250px;">You are currently offline. Please check your internet connection ⏳❌</h4>';
      document.body.style.backgroundColor = 'black';
    }
  }
  updateOnlineStatus();
  