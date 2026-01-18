'use server'

import { cookies } from "next/headers"

import { apiClient } from "../client"
import { ActionResponse } from "@/types/action-response"

interface LoginProps {
  email: string
  password: string
}

interface LoginResponse {
  access_token: string;
  account_id: string;
  account_type: string;
  refresh_token: string;
}

//* LOGIN
export const login = async (props: LoginProps): Promise<ActionResponse<LoginResponse>> => {
  try {
    const response = await apiClient.post<LoginResponse>(`/login`, {
      email: props.email,
      password: props.password
    });

    const cookieStore = await cookies();
    cookieStore.set('access_token', response.access_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    cookieStore.set('refresh_token', response.refresh_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return {
      success: true,
      response
    };
  } catch (error) {
    console.error("Error on login: ", error);

    return {
      success: false,
      error: {
        message: "Erro ao fazer login"
      }
    };
  }
};

//* LOGOUT
export async function logout() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (refreshToken) {
    try {
      await apiClient.post('/logout', { refresh_token: refreshToken });
    } catch {

    }
  }

  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
}
