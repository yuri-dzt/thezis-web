'use server'

import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"

import { User } from "@/types/entities/user"
import { apiClient, ApiError } from "../client"
import { ActionResponse } from "@/types/action-response"

interface CreateUserProps {
  name: string
  email: string
  password: string
}

interface UpdateUserProps {
  user_id: string
  name?: string
  email?: string
  password?: string
  role?: string
}

const BASE_PATH = '/users'

//* GET ALL USERS
export const getUsers = async (): Promise<ActionResponse<{ users: User[] }>> => {
  try {

    const response = await apiClient.get<User[]>(BASE_PATH, {
      tags: ["users"]
    });

    return {
      success: true,
      response: {
        users: response,
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
        message: 'Erro ao pegar usuários'
      },
    };
  }
};

//* CREATE USER
export const createUser = async (props: CreateUserProps): Promise<ActionResponse<void>> => {
  try {
    await apiClient.post<User>(`${BASE_PATH}`, {
      name: props.name,
      email: props.email,
      password: props.password
    },)

    revalidateTag("users", "default")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error creating user: ", error)

    return {
      success: false,
      error: {
        message: "Erro ao criar usuário"
      }
    }
  }
}

//* UPDATE USER
export const updateUser = async ({ user_id, email, name, password, role }: UpdateUserProps): Promise<ActionResponse<void>> => {
  try {
    await apiClient.patch<User>(`${BASE_PATH}/${user_id}`, {
      name: name,
      email: email,
      password: password,
      role: role
    })

    revalidateTag("users", "default")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error updating user: ", error)

    return {
      success: false,
      error: {
        message: "Erro ao atualizar usuário"
      }
    }
  }
}

//* DELETE USER
export const deleteUser = async (user_id: string) => {
  try {
    await apiClient.delete<void>(`${BASE_PATH}/${user_id}`, { tags: ["users"] });

    revalidateTag("users", "default");
  } catch (error) {
    throw error;
  }
}

//* REFRESH ACCOUNT
export const refreshAccount = async (): Promise<ActionResponse<User>> => {
  try {

    const response = await apiClient.get<User>(`/users/refresh`, {
      tags: ["users"]
    });

    return {
      success: true,
      response,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      error: {
        message: 'Erro ao pegar usuário'
      },
    };
  }
};
