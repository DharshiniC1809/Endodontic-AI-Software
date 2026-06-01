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

export const loginUser = async (
    email,
    password
) => {

    const response = await fetch(
        `${API_URL}/auth/login`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        }
    );

    return await response.json();
};

export const signupUser = async (
    name,
    email,
    password
) => {

    const response = await fetch(
        `${API_URL}/auth/signup`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })
        }
    );

    return await response.json();
};

export const updateProfile = async (
    userId,
    name,
    email
) => {

    const response = await fetch(
        `${API_URL}/auth/profile`,
        {
            method: "PUT",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                userId,
                name,
                email
            })
        }
    );

    return await response.json();

};

export const changePassword = async (
    userId,
    currentPassword,
    newPassword
) => {

    const response = await fetch(
        `${API_URL}/auth/change-password`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                userId,
                currentPassword,
                newPassword
            })
        }
    );

    return await response.json();

};

export const saveAnalysis =
    async (data) => {

        const response =
            await fetch(
                `${API_URL}/analysis/save`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

        return await response.json();
    };

export const getHistory =
    async () => {

        const response =
            await fetch(
                `${API_URL}/analysis/history`
            );

        return await response.json();
    };

export const updateNotes =
    async (
        id,
        notes
    ) => {

        const response =
            await fetch(

                `${API_URL}/analysis/notes/${id}`,

                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            notes
                        })
                }
            );

        return await response.json();

    };

export const deleteCase =
    async (id) => {

        const response =
            await fetch(
                `${API_URL}/analysis/${id}`,
                {
                    method: "DELETE"
                }
            );

        return await response.json();

    };