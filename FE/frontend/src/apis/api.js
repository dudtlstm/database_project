const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchPeople = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/people/`);
        const data = await response.json();
        console.log("Fetched data:", data); // 디버깅
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
    }
};


export const fetchTimeline = async (personId) => {
    const response = await fetch(`${API_BASE_URL}/people/${personId}/events/`);
    return response.json();
};

export const fetchEventDetail = async (eventId) => {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}/`);
    return response.json();
};
