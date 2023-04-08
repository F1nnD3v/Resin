import IsEmpty from "../Utils/IsEmpty";

const RegisterUser = async (username: string, displayName: string, email: string, password: string) => {
    if (IsEmpty(username) || IsEmpty(displayName) || IsEmpty(email) || IsEmpty(password)) {
        return JSON.stringify({
            "Code": 401,
            "Message": "You must fill all fields."
        })
    }
    return await fetch(`${process.env.API_URL}:${process.env.API_PORT}/RegisterUser`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            "username": username,
            "displayName": displayName,
            "email": email,
            "password": password
        })
    });
}

export default RegisterUser