    import axios from "axios";
    import type { Event } from "../types/eventTypes";

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

    export async function getUserFavoriteEvents(userId: string | null | undefined): Promise<Event[]> {
        if (userId === null || userId === undefined){
            return [];
        }
        try {
            const response = await api.get(`/profiles/favorite-events/${userId}`)
            return response.data;
        } catch (error) {
            console.error(error);
            return []
        }
    }

    export async function favoriteEvent(eventId: string): Promise<void>{
        try {
            await api.post(`/profiles/favorite-events/${eventId}`)
            
        } catch (error) {
            console.error(error);
            return;
        }
    }

    export async function unfavoriteEvent(eventId: string): Promise<void>{
        try {
            await api.delete(`/profiles/favorite-events/${eventId}`);
        } catch (error) {
            console.error(error);
        }
    }