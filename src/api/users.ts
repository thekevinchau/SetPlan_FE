import { emptyProfile, type UserProfile, type UserRegistration } from "@/types/userTypes";
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})

export async function login(email: string, password: string): Promise<UserProfile> {
    try {
        const credentials = { email: email, password: password}
        const response = await api.post('/auth/login', credentials);
        localStorage.setItem("currentUser", JSON.stringify(response.data))
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return {...emptyProfile} ;
    }
}

export async function logout(){
    try {
        const response = await api.post('/auth/logout');
        console.log(response.data);
    } catch (error) {
        console.error(error);

    }
}

export async function registerUser(data: UserRegistration){
    try {
        const response = await api.post('/auth/register', data);
        return {success: true, data: response.data};
    } catch (error) {
        console.error(error);
        return {success: false, error: String(error)}
    }
}