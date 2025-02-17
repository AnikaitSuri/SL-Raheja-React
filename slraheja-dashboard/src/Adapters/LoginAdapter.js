import { baseUrl } from '../variables/Variables.js';

// export const Loginadapter = async (credentials) => {
//     const settings = {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//     };

//     try {
//         const response = await fetch(
//             baseUrl + '/api/admin-login',
//             settings
//         );
//         const data = await response.json();

//         if (response.ok && data.status_code === 200) {
//             const { user, token, role } = data;

//             // Store the user data and token
//             localStorage.setItem("token", token);
//             localStorage.setItem("user", JSON.stringify(user));
//             localStorage.setItem("role", role);

//             return { success: true, redirectUrl: data.redirect_url };
//         } else {
//             return { success: false, error: data.status_message || "Login failed" };
//         }
//     } catch (error) {
//         return { success: false, error: "Network error. Please try again later." };
//     }
// };

// src/adapters/LoginAdapter.js
export const Loginadapter = async (credentials) => {
    const settings = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    };

    try {
        const response = await fetch(
            baseUrl + `api/admin-login`,
            settings
        );
        const data = await response.json();

        if (response.ok && data.status === "Success") {
            const { user, token } = data.data;

            // Extract roles from the response
            const roles = user.roles.map((role) => role.name);

            // Store data in localStorage
            localStorage.setItem("token", token); // Token
            localStorage.setItem("user", JSON.stringify(user)); // User details
            localStorage.setItem("roles", JSON.stringify(roles)); // Roles as an array

            console.log("Token--->", token);

            return { success: true };
        } else {
            return {
                success: false,
                error: data.message || "Login failed. Please try again.",
            };
        }
    } catch (error) {
        return { success: false, error: "Network error. Please try again later." };
    }
};