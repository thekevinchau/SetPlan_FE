import axios from 'axios';
import type { AnnouncementComment, AnnouncementPayload, AnnouncementResponse } from '../types/announcementTypes';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})

export async function getAnnouncements(): Promise<AnnouncementResponse> {
  console.log('fetching')
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

export async function createAnnouncement(payload: AnnouncementPayload){
  try{
    const response = await api.post('/announcements', payload);
    return response.data;
  }catch(err){
    console.error(err);
    return;
  }
}

export async function deleteAnnouncement(announcementId: string): Promise<void>{
  try{
    const response = await api.delete(`/announcements/${announcementId}`)
    return response.data;
  }catch(err){
    console.error(err);
    return;
  }
}

export async function editAnnouncement(announcementId: string, edits: AnnouncementPayload): Promise<void>{
  try {
    const response = await api.patch(`/announcements/${announcementId}`, edits)
    return response.data;
  } catch (error) {
    console.error(error);
    return;
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
    return;
  }
}

export async function deleteComment(commentId: string){
  try {
    const response = await api.delete(`/announcements/comments/${commentId}`)
    return response.data;
  } catch (error) {
    console.error("Error deleting a comment", error)
    return;
  }
}
