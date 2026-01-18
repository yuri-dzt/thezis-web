'use server'

import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"

import { apiClient, ApiError } from "../client"
import { Session } from "@/types/entities/session"
import { ActionResponse } from "@/types/action-response"

const BASE_PATH = '/sessions'

//* GET ALL SESSIONS
export const getSessions = async (): Promise<ActionResponse<{ sessions: Session[] }>> => {
  try {

    const response = await apiClient.get<Session[]>(BASE_PATH, {
      tags: ["sessions"]
    });

    return {
      success: true,
      response: {
        sessions: response,
      },
    };
  } catch (err) {
    console.error(err);

    if (err instanceof ApiError && err.status === 401) {
      const cookieStore = await cookies();
      cookieStore.delete("access_token");
      cookieStore.delete("refresh_token");

      return {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Sessão expirada',
        },
      };
    }

    return {
      success: false,
      error: {
        message: 'Erro ao pegar sessões',
      },
    };
  }
};

//* DELETE SESSION
export const deleteSession = async (session_id: string) => {
  try {
    await apiClient.delete<void>(`${BASE_PATH}/${session_id}`);

    revalidateTag("sessions", "default");
  } catch (error) {
    throw error;
  }
}