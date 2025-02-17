import { baseUrl } from '../variables/Variables.js';

export const contactList = async () => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/contact-us-list`, settings);

        console.log("Raw API Response:", response);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching contact list:", error);
        throw error;
    }
};

export const addBanner = async (formData) => {
    const Suser = JSON.parse(localStorage.getItem("user"));
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${Suser.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: formData, // FormData for multipart/form-data
    };

    try {
        const response = await fetch(`${baseUrl}api/add-banner`, settings);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error adding banner:", error);
        return { success: false, error: "Failed to add banner. Please try again later." };
    }
};

export const fetchBanners = async () => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/home-banner-list`, settings);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching banners:", error);
        throw error;
    }
};

// Add Tech Patient
export const addTechPatient = async (data) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: data, // FormData for multipart data
    };

    try {
        const response = await fetch(`${baseUrl}api/add-tech-patient`, settings);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error adding tech patient:", error);
        throw error;
    }
};

// Fetch Tech Patients List
export const fetchTechPatients = async () => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/tech-patient-list`, settings);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching tech patients:", error);
        throw error;
    }
};

// Edit Tech Patient
export const editTechPatient = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/edit-tech-patient/${id}`, settings);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error editing tech patient:", error);
        throw error;
    }
};

// Update Tech Patient
export const updateTechPatient = async (id, data) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: data, // FormData for multipart data
    };

    try {
        const response = await fetch(`${baseUrl}api/update-tech-patient/${id}`, settings);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating tech patient:", error);
        throw error;
    }
};

// Trash Tech Patient
export const trashTechPatient = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/trash-tech-patient/${id}`, settings);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error trashing tech patient:", error);
        throw error;
    }
};

// Fetch Patient Stories List
export const fetchPatientStories = async () => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/patient-stories-list`, settings);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching patient stories:", error);
        throw error;
    }
};

// Add Patient Story
export const addPatientStory = async (data) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: data, // FormData for multipart data
    };

    try {
        const response = await fetch(`${baseUrl}api/add-patient-story`, settings);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error adding patient story:", error);
        throw error;
    }
};

// Edit Patient Story
export const editPatientStory = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/edit-patient-story/${id}`, settings);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error editing patient story:", error);
        throw error;
    }
};

// Update Patient Story
export const updatePatientStory = async (id, data) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: data, // FormData for multipart data
    };

    try {
        const response = await fetch(`${baseUrl}api/update-patient-story/${id}`, settings);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating patient story:", error);
        throw error;
    }
};

// Trash Patient Story
export const trashPatientStory = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/trash-patient-story/${id}`, settings);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error trashing patient story:", error);
        throw error;
    }
};

// Fetch Upcoming Events List
export const fetchUpcomingEvents = async () => {
    const token = localStorage.getItem("token"); // Token for authentication
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/upcoming-events-list`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching upcoming events:", error);
        throw error;
    }
};

// Add Upcoming Event
export const addUpcomingEvent = async (eventData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: eventData, // FormData for file uploads if needed
    };

    try {
        const response = await fetch(`${baseUrl}api/add-upcoming-events`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding upcoming event:", error);
        throw error;
    }
};

// Edit Upcoming Event
export const editUpcomingEvent = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(
            `${baseUrl}api/edit-upcoming-events/${id}`,
            settings
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error editing upcoming event:", error);
        throw error;
    }
};

// Update Upcoming Event
export const updateUpcomingEvent = async (id, eventData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: eventData, // FormData for file uploads if needed
    };

    try {
        const response = await fetch(
            `${baseUrl}api/update-upcoming-events/${id}`,
            settings
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating upcoming event:", error);
        throw error;
    }
};

// Trash Upcoming Event
export const trashUpcomingEvent = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(
            `${baseUrl}api/trash-upcoming-events/${id}`,
            settings
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error trashing upcoming event:", error);
        throw error;
    }
};

// Fetch Better Info Better Health List
export const fetchBetterInfoHealthList = async () => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/better-info-health-list`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching better info health list:", error);
        throw error;
    }
};

// Add Better Info Health
export const addBetterInfoHealth = async (infoData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: infoData,
    };

    try {
        const response = await fetch(`${baseUrl}api/add-better-info-health`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding better info health:", error);
        throw error;
    }
};

// Edit Better Info Health
export const editBetterInfoHealth = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/edit-better-info-health/${id}`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error editing better info health:", error);
        throw error;
    }
};

// Update Better Info Health
export const updateBetterInfoHealth = async (id, infoData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: infoData,
    };

    try {
        const response = await fetch(`${baseUrl}api/update-better-info-health/${id}`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating better info health:", error);
        throw error;
    }
};

// Trash Better Info Health
export const trashBetterInfoHealth = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/trash-better-info-health/${id}`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error trashing better info health:", error);
        throw error;
    }
};

// Fetch Doctors List
export const fetchDoctorsList = async () => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/doctors-list`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching doctors list:", error);
        throw error;
    }
};

// Add Doctor
export const addDoctor = async (doctorData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: doctorData,
    };

    try {
        const response = await fetch(`${baseUrl}api/add-doctor`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding doctor:", error);
        throw error;
    }
};

// Edit Doctor
export const editDoctor = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/edit-doctor/${id}`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error editing doctor:", error);
        throw error;
    }
};

// Trash Doctor
export const trashDoctor = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/trash-doctor/${id}`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error trashing doctor:", error);
        throw error;
    }
};

// Fetch fetchSpecialtiesList List
export const fetchSpecialtiesList = async () => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/specialities-list`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching specialities list:", error);
        throw error;
    }
};

// Add Specialty
export const addSpecialty = async (specialtyData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: specialtyData,
    };

    try {
        const response = await fetch(`${baseUrl}api/add-specialties`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error adding specialty:", error);
        throw error;
    }
};

// Edit Specialty
export const editSpecialty = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/edit-specialties/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error fetching specialty for editing:", error);
        throw error;
    }
};

// Update Specialty
export const updateSpecialty = async (id, specialtyData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: specialtyData,
    };

    try {
        const response = await fetch(`${baseUrl}api/update-specialties/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error updating specialty:", error);
        throw error;
    }
};

// Trash Specialty
export const trashSpecialty = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/trash-specialties/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error deleting specialty:", error);
        throw error;
    }
};

// Fetch Why Choose Raheja List
export const fetchWhyChooseRahejaList = async () => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/list-about-why-choose-raheja`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching Why Choose Raheja list:", error);
        throw error;
    }
};

// Add Why Choose Raheja
export const addWhyChooseRaheja = async (rahejaData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: rahejaData,
    };

    try {
        const response = await fetch(`${baseUrl}api/add-about-why-choose-raheja`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error adding Why Choose Raheja entry:", error);
        throw error;
    }
};

// Edit Why Choose Raheja
export const editWhyChooseRaheja = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/edit-about-why-choose-raheja/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error fetching Why Choose Raheja for editing:", error);
        throw error;
    }
};

// Update Why Choose Raheja
export const updateWhyChooseRaheja = async (id, rahejaData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: rahejaData,
    };

    try {
        const response = await fetch(`${baseUrl}api/update-about-why-choose-raheja/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error updating Why Choose Raheja entry:", error);
        throw error;
    }
};

// Delete Why Choose Raheja
export const deleteWhyChooseRaheja = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/trash-about-why-choose-raheja/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error deleting Why Choose Raheja entry:", error);
        throw error;
    }
};

// Fetch Why Choose Raheja List
export const fetchAwardsAccoladesList = async () => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/list-about-awards-accolades`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching Why Choose Raheja list:", error);
        throw error;
    }
};

// Edit Award or Accolade by ID
export const editAwardsAccolade = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/edit-about-awards-accolades/${id}`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching award or accolade details:", error);
        throw error;
    }
};

// Update Award or Accolade
export const updateAwardsAccolade = async (id, formData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    };

    try {
        const response = await fetch(`${baseUrl}api/update-about-awards-accolades/${id}`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating award or accolade:", error);
        throw error;
    }
};

// Trash/Delete Award or Accolade
export const trashAwardsAccolade = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/trash-about-awards-accolades/${id}`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting award or accolade:", error);
        throw error;
    }
};

// Add Awards and Accolades
export const addAwardsAccolades = async (formData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData, // FormData includes file and other fields
    };

    try {
        const response = await fetch(`${baseUrl}api/add-awards-accolades`, settings);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to add Awards and Accolades.");
        }

        const data = await response.json();
        return data; // Success response
    } catch (error) {
        console.error("Error adding Awards and Accolades:", error);
        throw error;
    }
};

// Fetch Careers Job Listings
export const fetchJobList = async () => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/list-job`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error fetching job list:", error);
        throw error;
    }
};

// Add Career Job
export const addJob = async (jobData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: jobData,
    };

    try {
        const response = await fetch(`${baseUrl}api/create-job`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error adding job:", error);
        throw error;
    }
};

// Edit Career Job (Fetch details by ID)
export const fetchJobDetailsById = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/edit-job/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error fetching job details:", error);
        throw error;
    }
};

// Update Career Job
export const editJob = async (id, jobData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: jobData,
    };

    try {
        const response = await fetch(`${baseUrl}api/update-job/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error updating job:", error);
        throw error;
    }
};

// Update Career Job
export const updateJob = async (id, jobData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: jobData,
    };

    try {
        const response = await fetch(`${baseUrl}api/update-job/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error updating job:", error);
        throw error;
    }
};

// Trash Career Jobs
export const trashJob = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/trash-job/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error trashing job:", error);
        throw error;
    }
};

// Add Career at Raheja
export const addCareerAtRaheja = async (careerData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: careerData,
    };

    try {
        const response = await fetch(`${baseUrl}api/add-career-at-raheja`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error adding Career at Raheja:", error);
        throw error;
    }
};

// Fetch Career at Raheja List
export const fetchCareerAtRahejaList = async () => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/list-career-at-raheja`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error fetching Career at Raheja list:", error);
        throw error;
    }
};

// Edit Career at Raheja
export const editCareerAtRaheja = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/edit-career-at-raheja/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error editing Career at Raheja:", error);
        throw error;
    }
};

// Update Career at Raheja
export const updateCareerAtRaheja = async (id, careerData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: careerData,
    };

    try {
        const response = await fetch(`${baseUrl}api/update-career-at-raheja/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error updating Career at Raheja:", error);
        throw error;
    }
};

// Trash Career at Raheja
export const trashCareerAtRaheja = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/trash-career-at-raheja/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error trashing Career at Raheja:", error);
        throw error;
    }
};

// Add Contact Info
export const addContactInfo = async (contactData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: contactData,
    };

    try {
        const response = await fetch(`${baseUrl}api/add-raheja-contact-info`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error adding contact info:", error);
        throw error;
    }
};

// List Contact Info
export const fetchContactInfoList = async () => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/list-raheja-contact-info`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error fetching contact info list:", error);
        throw error;
    }
};

// Edit Contact Info
export const editContactInfo = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/edit-raheja-contact-info/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error editing contact info:", error);
        throw error;
    }
};

// Update Contact Info
export const updateContactInfo = async (id, contactData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: contactData,
    };

    try {
        const response = await fetch(`${baseUrl}api/update-raheja-contact-info/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error updating contact info:", error);
        throw error;
    }
};

// Trash Contact Info
export const trashContactInfo = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/trash-raheja-contact-info/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error trashing contact info:", error);
        throw error;
    }
};

// Fetch Health Checkup Details List
export const fetchHealthCheckupList = async () => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/list-health-checkup-details`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error fetching health checkup list:", error);
        throw error;
    }
};

// Add Health Checkup
export const addHealthCheckup = async (formData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: formData,
    };

    try {
        const response = await fetch(`${baseUrl}api/add-health-checkup-details`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error adding health checkup:", error);
        throw error;
    }
};

// Edit Health Checkup
export const editHealthCheckup = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/edit-health-checkup-details/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error fetching health checkup details:", error);
        throw error;
    }
};

// Update Health Checkup
export const updateHealthCheckup = async (id, formData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: formData,
    };

    try {
        const response = await fetch(`${baseUrl}api/update-health-checkup-details/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error updating health checkup:", error);
        throw error;
    }
};

// Trash Health Checkup
export const trashHealthCheckup = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/trash-health-checkup-details/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error trashing health checkup:", error);
        throw error;
    }
};

// Add Health Checkup Package
export const addHealthCheckupPackage = async (formData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: formData,
    };

    try {
        const response = await fetch(`${baseUrl}api/add-health-checkup-package`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error adding health checkup package:", error);
        throw error;
    }
};

// List Health Checkup Package
export const fetchHealthCheckupPackageList = async () => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/list-health-checkup-package`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error fetching health checkup packages:", error);
        throw error;
    }
};

// Edit Health Checkup Package
export const editHealthCheckupPackage = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/edit-health-checkup-package/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error fetching package details for editing:", error);
        throw error;
    }
};

// Update Health Checkup Package
export const updateHealthCheckupPackage = async (id, formData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: formData,
    };

    try {
        const response = await fetch(`${baseUrl}api/update-health-checkup-package/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error updating health checkup package:", error);
        throw error;
    }
};

// Trash Health Checkup Package
export const trashHealthCheckupPackage = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/trash-health-checkup-package/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error deleting health checkup package:", error);
        throw error;
    }
};

// Add Health Checkup Test Inclusion
export const addHealthCheckupTestInclusion = async (data) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(`${baseUrl}api/add-health-checkup-test-inclusion`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error adding Health Checkup Test Inclusion:", error);
        throw error;
    }
};

// List Health Checkup Test Inclusions
export const fetchHealthCheckupTestInclusions = async () => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/list-health-checkup-test-inclusion`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error fetching Health Checkup Test Inclusions:", error);
        throw error;
    }
};

// Edit Health Checkup Test Inclusion
export const editHealthCheckupTestInclusion = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/edit-health-checkup-test-inclusion/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error editing Health Checkup Test Inclusion:", error);
        throw error;
    }
};

// Update Health Checkup Test Inclusion
export const updateHealthCheckupTestInclusion = async (id, data) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(`${baseUrl}api/update-health-checkup-test-inclusion/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error updating Health Checkup Test Inclusion:", error);
        throw error;
    }
};

// Trash Health Checkup Test Inclusion
export const trashHealthCheckupTestInclusion = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/trash-health-checkup-test-inclusion/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error trashing Health Checkup Test Inclusion:", error);
        throw error;
    }
};

// Add Academics Overview
export const addAcademicsOverview = async (data) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: data,
    };

    try {
        const response = await fetch(`${baseUrl}api/add-academics-overview`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error adding Academics Overview:", error);
        throw error;
    }
};

// List Academics Overview
export const fetchAcademicsOverview = async () => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/list-academics-overview`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error fetching Academics Overview:", error);
        throw error;
    }
};

// Edit Academics Overview
export const editAcademicsOverview = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/edit-academics-overview/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error editing Academics Overview:", error);
        throw error;
    }
};

// Update Academics Overview
export const updateAcademicsOverview = async (id, data) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: data,
    };

    try {
        const response = await fetch(`${baseUrl}api/update-academics-overview/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error updating Academics Overview:", error);
        throw error;
    }
};

// Trash Academics Overview
export const trashAcademicsOverview = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/trash-academics-overview/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error trashing Academics Overview:", error);
        throw error;
    }
};

// Add Academics Program Details
export const addAcademicsProgramDetails = async (data) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: data,
    };

    try {
        const response = await fetch(
            `${baseUrl}api/add-academics-program-details`,
            settings
        );
        return await response.json();
    } catch (error) {
        console.error("Error adding Academics Program Details:", error);
        throw error;
    }
};

// List Academics Program Details
export const fetchAcademicsProgramDetails = async () => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(
            `${baseUrl}api/list-academics-program-details`,
            settings
        );
        return await response.json();
    } catch (error) {
        console.error("Error fetching Academics Program Details:", error);
        throw error;
    }
};

// Edit Academics Program Details
export const editAcademicsProgramDetails = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(
            `${baseUrl}api/edit-academics-program-details/${id}`,
            settings
        );
        return await response.json();
    } catch (error) {
        console.error("Error editing Academics Program Details:", error);
        throw error;
    }
};

// Update Academics Program Details
export const updateAcademicsProgramDetails = async (id, data) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: data,
    };

    try {
        const response = await fetch(
            `${baseUrl}api/update-academics-program-details/${id}`,
            settings
        );
        return await response.json();
    } catch (error) {
        console.error("Error updating Academics Program Details:", error);
        throw error;
    }
};

// Trash Academics Program Details
export const trashAcademicsProgramDetails = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(
            `${baseUrl}api/trash-academics-program-details/${id}`,
            settings
        );
        return await response.json();
    } catch (error) {
        console.error("Error trashing Academics Program Details:", error);
        throw error;
    }
};


// Add Banner
export const addBannerCMS = async (bannerData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: bannerData,
    };

    try {
        const response = await fetch(`${baseUrl}api/add-banner`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error adding banner:", error);
        throw error;
    }
};

// Fetch Banners
export const fetchBannersCMS = async () => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/list-home-banners`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error fetching banners:", error);
        throw error;
    }
};

// Edit Banner
export const editBanner = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/edit-home-banner/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error fetching banner details for editing:", error);
        throw error;
    }
};

// Update Banner
export const updateBanner = async (id, bannerData) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: bannerData,
    };

    try {
        const response = await fetch(`${baseUrl}api/update-home-banner/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};

// Trash Banner
export const trashBanner = async (id) => {
    const token = localStorage.getItem("token");
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${baseUrl}api/trash-home-banner/${id}`, settings);
        return await response.json();
    } catch (error) {
        console.error("Error deleting banner:", error);
        throw error;
    }
};