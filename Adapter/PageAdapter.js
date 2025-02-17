import { baseUrl } from '../variables/Variables';

// Fetch About Us Banner
export const fetchAboutUsBanner = async () => {
    const settings = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/fetch-about-us-banner`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        console.error("Error fetching About Us Banner:", e);
        return e;
    }
};

// Fetch Why Choose Raheja
export const fetchWhyChooseRaheja = async () => {
    const settings = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/fetch-why-choose-raheja`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        console.error("Error fetching Why Choose Raheja:", e);
        return e;
    }
};

// Fetch Awards & Accolades
export const fetchAwardsAccolades = async () => {
    const settings = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/fetch-about-awards-accolades`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        console.error("Error fetching Awards & Accolades:", e);
        return e;
    }
};

// Fetch Career Banner
export const fetchCareerBanner = async () => {
    const settings = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/fetch-career-banner`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        console.error("Error fetching Career Banner:", e);
        return e;
    }
};

// Fetch Career At Raheja
export const fetchCareerAtRaheja = async () => {
    const settings = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/fetch-career-at-raheja`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        console.error("Error fetching About Us Banner:", e);
        return e;
    }
};

// Fetch Job Listings
export const fetchJobListings = async () => {
    const settings = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/fetch-jobs`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        console.error("Error fetching job listings:", e);
        return e;
    }
};

// Fetch Job Details

export const fetchJobDetails = async (id) => {
    const settings = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(baseUrl + `api/fetch-job-details/${id}`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
};

// Fetch Career Details Banner
export const fetchCareerDetailsBanner = async () => {
    const settings = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/fetch-career-detail-banner`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        console.error("Error fetching Career Banner:", e);
        return e;
    }
};

export const createJobApplication = async (formData) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const settings = {
        method: "POST",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: formData,
    };

    try {
        const response = await fetch(baseUrl + `api/apply-job-application`, settings);

        if (!response.ok) {
            // Extract error from response and throw
            const errorData = await response.json();
            throw new Error(errorData.error || "An error occurred while adding job application.");
        }

        // Parse and return JSON for successful responses
        return await response.json();
    } catch (error) {
        console.error("Error in adding job application:", error);
        throw error;
    }
};

// Fetch Health Checkup Banner
export const fetchHealthCheckupBanner = async () => {
    const settings = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/fetch-health-checkup-banner`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        console.error("Error fetching Health checkup Banner:", e);
        return e;
    }
};

// Fetch Health Checkup Details Banner
export const fetchHealthCheckupDetailsBanner = async () => {
    const settings = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/fetch-health-checkup-details-banner`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        console.error("Error fetching Health checkup details Banner:", e);
        return e;
    }
};

// Fetch Health Checkup Details
export const fetchHealthCheckupDetails = async () => {
    const settings = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/fetch-health-checkup-details`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        console.error("Error fetching health checkup details:", e);
        return e;
    }
};

// Fetch specific Health Checkup Details
export const fetchHealthCheckupDetailsById = async (id) => {
    const settings = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/all-health-checkup-details/${id}`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        console.error("Error fetching health checkup details by ID:", e);
        return e;
    }
};

// Fetch Academics Banner
export const fetchAcademicsBanner = async () => {
    const settings = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/fetch-academics-banner`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        console.error("Error fetching Academics Banner:", e);
        return e;
    }
};

// Fetch Academics Overview
export const fetchAcademicsOverview = async () => {
    const settings = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const fetchResponse = await fetch(baseUrl + `api/fetch-academics-overview`, settings);
        const datahttp = await fetchResponse.json();
        return datahttp;
    } catch (e) {
        console.error("Error fetching Academics Banner:", e);
        return e;
    }
};

export const fetchHealthCheckupComparison = async (ids) => {
    // const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
    };

    try {
        const response = await fetch(
            `${baseUrl}/api/fetch-health-checkup-comparison`,
            settings
        );
        return await response.json();
    } catch (error) {
        console.error("Error fetching health checkup comparison:", error);
        throw error;
    }
};
