'use client';

import { API_URL } from '@/src/api';
import { Response } from '@/src/types/response.types';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Layout(props: {
  newForm: React.ReactNode;
  updateForm: React.ReactNode;
}) {
  const [isNew, setIsNew] = useState<boolean | undefined>(true);

  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  const usernameAvailabe = async (value: string) => {
    const res = await fetch(`${API_URL}users/available?username=${value}`);
    const result: Response<boolean> = await res.json();

    setIsNew(result.data);
  };

  useEffect(() => {
    if (username) {
      usernameAvailabe(username);
    }
  }, [username]);

  return <>{isNew ? props.newForm : props.updateForm}</>;
}
