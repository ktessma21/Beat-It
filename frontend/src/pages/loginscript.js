export async function loginUser(username, password, registrationtype) {
    const url = "https://beatitbackend.onrender.com";

    try {
        if (registrationtype === "signup") {
            const res = await fetch(`${url}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (!data.user_id) {
                alert("Signup failed");
                return null;
            }
        }

        const res = await fetch(`${url}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();

        if (data.success && data.token) {
            alert("Login successful!");
            return data.token;
        } else {
            alert("Login failed.");
            return null;
        }
    } catch (err) {
        console.error("Error:", err);
        return null;
    }
}

