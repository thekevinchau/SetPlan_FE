import axios from "axios";
import type { Event } from "../types/eventTypes";


export async function getAllEvents(): Promise<Event[]>{
    try{
        console.log('sent request')
        const response = await axios.get('http://localhost:8080/events?page=0&size=10')
        return response.data;
    }
    catch(err){
        console.error(err);
        return [];
    }
}

export async function getFutureEvents(): Promise<Event[]>{
    try {
        console.log('sent request')
        const response = await axios.get('http://localhost:8080/events?page=0&size=10&future=true')
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}