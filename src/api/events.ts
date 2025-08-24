import axios from "axios";
import type { Event, EventCreation } from "../types/eventTypes";
import { serverBaseURL } from "@/config";

const api = axios.create({
  baseURL: serverBaseURL,
  withCredentials: true,
});

export async function getFutureEvents(): Promise<Event[]> {
  try {
    const response = await api.get("/events?page=0&size=10&isFuture=true");
    console.log("fetched");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPastEvents(): Promise<Event[]> {
  try {
    const response = await api.get("/events?page=0&size=10&isFuture=false");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getUserFavoriteEvents(
  userId: string | null | undefined
): Promise<Event[]> {
  if (userId === null || userId === undefined) {
    return [];
  }
  try {
    const response = await api.get(`/profiles/favorite-events/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function favoriteEvent(eventId: string): Promise<void> {
  try {
    await api.post(`/profiles/favorite-events/${eventId}`);
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function unfavoriteEvent(eventId: string): Promise<void> {
  try {
    await api.delete(`/profiles/favorite-events/${eventId}`);
  } catch (error) {
    console.error(error);
  }
}

export async function generateEventPresignedUrl(
  eventId: string,
  imageCategory: string,
  contentType: string
) {
  try {
    const response = await api.get(
      `/events/image-upload-url/${eventId}?contentType=${contentType}&imageCategory=${imageCategory}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function uploadEventImageToS3(
  presignedUrl: string,
  imageFile: File
) {
  try {
    await axios.put(presignedUrl, imageFile, {
      headers: {
        "Content-Type": imageFile.type,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createEvent(requestBody: EventCreation) {
  try {
    await api.post(`/events`, requestBody);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
