import { useEffect, useState } from 'react';
import { TUser, TUserPayload } from '@/types/user.types';
import { Response } from '@/types/response.types';
import { API_URL } from '@/api';

export function useFetchUser(username: string | null | undefined) {
  const [data, setData] = useState<TUser>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string | string[] | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/users/${username}`).finally(() =>
      setLoading(false),
    );
    const result: Response<TUser> = await res.json();

    if (result.error) {
      setError(result.message);
      return;
    }

    if (result.data) {
      setData(result.data);
      return;
    }
  };

  useEffect(() => {
    fetchUser();
  }, [username]);

  return { loading, data, error };
}

export function useCreateUser(username: string | null) {
  const [loading, setLoading] = useState<boolean | undefined>();

  const createUser = async (payload: TUserPayload) => {
    setLoading(true);

    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, ...payload }),
    }).finally(() => {
      setLoading(false);
    });

    const result: Response<TUser> = await res.json();
    return result;
  };

  return { createUser, loading };
}

export function useUpdateUser(username: string | null) {
  const [loading, setLoading] = useState<boolean | undefined>();

  const updateUser = async (payload: TUserPayload) => {
    setLoading(true);

    const res = await fetch(`${API_URL}/users/${username}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(payload),
    }).finally(() => setLoading(false));

    const result: Response<TUser> = await res.json();

    return result;
  };

  return { updateUser, loading };
}
