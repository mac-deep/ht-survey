'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@/components/Form';
import { useFetchUser, useUpdateUser } from '@/hooks/useUsers';
import { TUserPayload } from '@/types/user.types';

export default function UpdateFormPage({}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  const { data: userData, error, loading } = useFetchUser(username);
  const { updateUser } = useUpdateUser(username);
  const [errors, setErrors] = useState<string[] | null>();

  const handleUpdateForm = async (formPayload: TUserPayload) => {
    const { data, message, statusCode, error } = await updateUser(formPayload);
    if (error) {
      setErrors(message);
    }

    if (!error && statusCode === 200) {
      setErrors(null);
      router.push(`/result?form=updated`);
    }
  };

  return (
    <div className="w-full">
      <h2 className="mb-6 text-xl">
        Welcome back, <span className="font-bold">{username}</span>
      </h2>
      <Form errors={errors} onSubmit={handleUpdateForm} userData={userData} />
    </div>
  );
}
