document.addEventListener('DOMContentLoaded', function() {
    function showTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(function(content) {
        content.style.display = 'none';
      });
      document.querySelectorAll('.tab').forEach(function(tab) {
        tab.classList.remove('active');
      });
      document.getElementById(tabId).style.display = 'block';
      document.querySelector('.tab[data-tab="' + tabId + '"]').classList.add('active');
    }
  
    // Initialize by showing the 'signup' tab
    showTab('signup');
  
    // Add event listeners to tabs
    document.querySelectorAll('.tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        showTab(this.getAttribute('data-tab'));
      });
    });
  });