import axios from 'axios';
import type { AnnouncementComment, AnnouncementResponse } from '../types/announcementTypes';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})

export async function getAnnouncements(): Promise<AnnouncementResponse> {
  try {
    const response = await api.get<AnnouncementResponse>(
      '/announcements/all?page=0&size=10'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return {
      content: [],
      page: {
        size: 0,
        number: 0,
        totalElements: 0,
        totalPages: 0,
      },
    }; // fallback to empty data
  }
}

export async function getCommentsByAnnouncement(id: string): Promise<AnnouncementComment[]> {
  try {
    const response = await api.get(
      `/announcements/${id}/comments`
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching comments", err);
    return [];
  }
}

export async function commentOnPost(postId: string, payload: {content: string}){
  try {
    const response = await api.post(`/announcements/${postId}/comments`, payload);
    return response.data;
  } catch (error) {
    console.error("Error creating a comment ", error);
    return {};
  }
}
