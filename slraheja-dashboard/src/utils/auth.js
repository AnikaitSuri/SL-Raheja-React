// src/utils/auth.js

// Check if the user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    // console.log("Checking authentication. Token exists---:", token);
    return !!token; // Returns true if a token exists
  };

// Retrieve the user details
export const getUserDetails = () => {
    const user = localStorage.getItem("user");
    // console.log("Users Details --->", user);
    return user ? JSON.parse(user) : null;
};

// Retrieve the user's roles
export const getUserRoles = () => {
    const roles = localStorage.getItem("roles");
    return roles ? JSON.parse(roles) : [];
};

// Check if the user has a specific role
export const hasRole = (roleName) => {
    const roles = getUserRoles();
    return roles.includes(roleName);
};

// Clear the session on logout
export const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
};
