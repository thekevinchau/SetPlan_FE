import axios from 'axios';
import type { AnnouncementCommentResponse, AnnouncementResponse } from '../types/announcementTypes';

export async function getAnnouncements(): Promise<AnnouncementResponse> {
  try {
    const response = await axios.get<AnnouncementResponse>(
      'http://localhost:8080/announcements/all?page=0&size=10'
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

export async function getCommentsByAnnouncement(id: string){
    try{
        const response = await axios.get<AnnouncementCommentResponse>(`http://localhost:8080/announcements/${id}/comments`)
        console.log(response.data);
        return response.data;
    }
    catch(err){
        console.error('Error fetching comments', err);
        return {
            content: []
        }
    }
}