import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})

export async function login(email: string, password: string): Promise<string> {
    try {
        const credentials = { email: email, password: password}
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error(error);
        return 'Incorrect email or password.';
    }
}