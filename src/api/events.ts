import axios from "axios";
import type { Event } from "../types/eventTypes";

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})


export async function getFutureEvents(): Promise<Event[]>{
    try {
        console.log('sent request')
        const response = await api.get('/events?page=0&size=10&isFuture=true')
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