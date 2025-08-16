import axios from "axios";
import type { Event } from "../types/eventTypes";
import { type UserProfile } from "@/types/userTypes";

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})


export async function getFutureEvents(): Promise<Event[]>{
    try {
        const response = await api.get('/events?page=0&size=10&isFuture=true')
        console.log('fetched');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getPastEvents(): Promise<Event[]>{
    try {
        const response = await api.get('/events?page=0&size=10&isFuture=false');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    
    }
}

export async function favoriteEvent(eventId: string): Promise<UserProfile | void>{
    try {
        const response = await api.post(`/users/profiles/favorite-events/${eventId}`)
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        return response.data;
        
    } catch (error) {
        console.error(error);
        return;
    }
}