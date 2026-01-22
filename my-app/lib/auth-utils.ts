// Simple client-side auth utilities
// In a real application, you would use a proper auth solution like NextAuth.js

/**
 * Check if the user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("adminAuthenticated") === "true"
}

/**
 * Set the authentication status
 */
export function setAuthenticated(status: boolean): void {
  if (typeof window === "undefined") return
  if (status) {
    localStorage.setItem("adminAuthenticated", "true")
  } else {
    localStorage.removeItem("adminAuthenticated")
  }
}

/**
 * Log the user out
 */
export function logout(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("adminAuthenticated")
}
