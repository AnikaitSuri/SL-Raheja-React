import { baseUrl } from '../variables/Variables';

export const homeBaner = async () => {
    var Suser = JSON.parse(localStorage.getItem("userIn"));
    const settings = {
        method: "GET",
        headers: {
            // Authorization: "Bearer " + Suser.token + "",
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/fetch-home-banner`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        return e;
    }
};

export const techPatient = async () => {
    var Suser = JSON.parse(localStorage.getItem("userIn"));
    const settings = {
        method: "GET",
        headers: {
            // Authorization: "Bearer " + Suser.token + "",
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/list-tech-patient`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        return e;
    }
};

export const fetchPatientStory = async () => {
    var Suser = JSON.parse(localStorage.getItem("userIn"));
    const settings = {
        method: "GET",
        headers: {
            // Authorization: "Bearer " + Suser.token + "",
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/list-patient-story-post`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        return e;
    }
};

export const fetchPatientVideos = async () => {
    var Suser = JSON.parse(localStorage.getItem("userIn"));
    const settings = {
        method: "GET",
        headers: {
            // Authorization: "Bearer " + Suser.token + "",
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/list-patient-story-videos`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        return e;
    }
};


export const upcomingEvents = async () => {
    var Suser = JSON.parse(localStorage.getItem("userIn"));
    const settings = {
        method: "GET",
        headers: {
            // Authorization: "Bearer " + Suser.token + "",
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/list-upcoming-events`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        return e;
    }
};


export const infoHealth = async () => {
    var Suser = JSON.parse(localStorage.getItem("userIn"));
    const settings = {
        method: "GET",
        headers: {
            // Authorization: "Bearer " + Suser.token + "",
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/list-better-info-health`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        return e;
    }
};

// Contact page API

// export const addContact = async (contactData) => {
//     const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

//     console.log("Printed CSRF ---->", csrfToken);
    
//     const settings = {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             "X-CSRF-TOKEN": csrfToken, // Use the fetched token
//         },
//         body: JSON.stringify(contactData),
//     };

//     try {
//         const response = await fetch(baseUrl + `api/add-contact`, settings);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error submitting contact form:", error);
//         throw error;
//     }
// };

export const addContact = async (contactData) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const settings = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify(contactData),
    };

    try {
        const response = await fetch(baseUrl + `api/add-contact`, settings);

        if (!response.ok) {
            // Extract error from response and throw
            const errorData = await response.json();
            throw new Error(errorData.error || "An error occurred while adding contact.");
        }

        // Parse and return JSON for successful responses
        return await response.json();
    } catch (error) {
        console.error("Error in addContact:", error);
        throw error;
    }
};
