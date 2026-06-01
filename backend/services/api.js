const API_URL = "http://10.186.43.44:5000/api";

export const uploadScan = async (formData) => {

    const response = await fetch(
        `${API_URL}/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    return await response.json();
};