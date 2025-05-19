// Firebase utilities and helper functions
// This file provides helper functions for common Firebase operations

// Firebase user state management
const FirebaseUserManager = {
  // Store user data in localStorage
  storeUserData: function(user) {
    if (!user) return;
    
    const userData = {
      uid: user.uid,
      displayName: user.displayName || user.email.split('@')[0],
      email: user.email,
      photoURL: user.photoURL,
      isLoggedIn: true
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  },
  
  // Clear user data from localStorage
  clearUserData: function() {
    localStorage.removeItem('user');
  },
  
  // Get stored user data
  getStoredUserData: function() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  },
  
  // Check if user is admin
  isUserAdmin: function(user) {
    // You can implement your own admin check logic here
    // For example, check against a list of admin emails or admin roles
    return user && user.email === 'admin@example.com';
  }
};

// Firebase authentication UI helper
const FirebaseAuthUI = {
  // Update UI based on authentication state
  updateAuthUI: function(user) {
    const userSection = document.getElementById('userSection');
    const mobileUserItem = document.querySelector('.nav-item[data-navigate="login"]');
    
    if (!userSection) return;
    
    if (user && user.isLoggedIn) {
      // Update header user section for logged in user
      userSection.innerHTML = `
        <div class="flex items-center">
          <span class="mr-2">${user.displayName}</span>
          <button class="material-btn-outlined" id="logout-button">
            <span class="material-icons mr-1">logout</span>
            Logout
          </button>
        </div>
      `;
      
      // Update mobile nav if it exists
      if (mobileUserItem) {
        mobileUserItem.innerHTML = `
          <span class="material-icons">person</span>
          <span class="text-xs">Profile</span>
        `;
      }
      
      // Add logout event listener
      const logoutButton = document.getElementById('logout-button');
      if (logoutButton) {
        logoutButton.addEventListener('click', function() {
          FirebaseAuth.signOut()
            .then(() => {
              // Sign-out successful
              FirebaseUserManager.clearUserData();
              window.location.reload();
            })
            .catch(error => {
              console.error('Logout error:', error);
              showToast('Logout failed: ' + error.message, 'error');
            });
        });
      }
      
      // Show admin section if user is admin
      if (FirebaseUserManager.isUserAdmin(user)) {
        document.querySelectorAll('[data-navigate="admin"]').forEach(el => {
          el.classList.remove('hidden');
        });
      }
    } else {
      // Show login button for logged out user
      userSection.innerHTML = `
        <a href="#" class="material-btn-primary" data-navigate="login">
          <span class="material-icons mr-1">login</span>
          Login
        </a>
      `;
      
      // Update mobile nav if it exists
      if (mobileUserItem) {
        mobileUserItem.innerHTML = `
          <span class="material-icons">person</span>
          <span class="text-xs">Login</span>
        `;
      }
      
      // Hide admin section
      document.querySelectorAll('[data-navigate="admin"]').forEach(el => {
        el.classList.add('hidden');
      });
    }
    
    // Re-attach navigation handlers
    document.querySelectorAll('[data-navigate]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(link.getAttribute('data-navigate'));
      });
    });
  },
  
  // Initialize auth UI with stored user data (for page reloads)
  initAuthUI: function() {
    const userData = FirebaseUserManager.getStoredUserData();
    if (userData) {
      this.updateAuthUI(userData);
    } else {
      this.updateAuthUI(null);
    }
  }
};

// Set up auth state listener when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize auth UI with stored user data
  FirebaseAuthUI.initAuthUI();
  
  // Set up auth state listener if Firebase is initialized
  if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
    FirebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in
        const userData = FirebaseUserManager.storeUserData(user);
        FirebaseAuthUI.updateAuthUI(userData);
      } else {
        // User is signed out
        FirebaseUserManager.clearUserData();
        FirebaseAuthUI.updateAuthUI(null);
      }
    });
  }
});

// Make Firebase utilities available globally
window.FirebaseUserManager = FirebaseUserManager;
window.FirebaseAuthUI = FirebaseAuthUI;