import {
  emptyProfile,
  type profileExternalLink,
  type UserProfile,
  type UserProfileEdit,
  type UserRegistration,
} from "@/types/userTypes";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export async function login(
  email: string,
  password: string
): Promise<UserProfile> {
  try {
    const credentials = { email: email, password: password };
    const response = await api.post("/auth/login", credentials);
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error(error);
    return { ...emptyProfile };
  }
}

export async function logout() {
  try {
    await api.post("/auth/logout");
    localStorage.removeItem("currentUser");
  } catch (error) {
    console.error(error);
  }
}

export async function registerUser(data: UserRegistration) {
  try {
    const response = await api.post("/auth/register", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(error);
    return { success: false, error: String(error) };
  }
}

export async function updateExternalLink(
  profileId: string,
  payload: profileExternalLink
): Promise<UserProfile> {
  try {
    const response = await api.patch(`/profiles/links/${profileId}`, {
      externalLink: payload,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return { ...emptyProfile };
  }
}

export async function getMyProfile(): Promise<UserProfile> {
  try {
    const response = await api.get("/profiles/me");
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error(error);
    return { ...emptyProfile };
  }
}

export async function editUser(userId: string | null, edits: UserProfileEdit) {
  if (userId === null) {
    return;
  }
  try {
    await api.patch(`/profiles/${userId}`, edits);
  } catch (error) {
    console.error(error);
  }
}
