export class Guard {
  static isAuthenticated() {
    // Implement your authentication logic here
    // For example, check if a token exists in localStorage
    const token = localStorage.getItem("authToken");
    return !!token;
  }

  static redirectToLogin() {
    // Redirect to the login page
    window.location.href = "/login";
  }

  static protectRoute() {
    if (!this.isAuthenticated()) {
      this.redirectToLogin();
    }
  }
}