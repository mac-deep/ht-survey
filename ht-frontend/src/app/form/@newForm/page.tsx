'use client';

import Form from '@/components/Form';
import { useCreateUser, useFetchUser } from '@/hooks/useUsers';
import { TUserPayload } from '@/types/user.types';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function NewFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  const [errors, setErrors] = useState<string[] | null>();
  const { createUser } = useCreateUser(username);

  const handleSubmitForm = async (formPayload: TUserPayload) => {
    const { statusCode, error, message } = await createUser(formPayload);
    if (error) {
      setErrors(message);
    }

    if (statusCode === 201) {
      setErrors(null);
      router.push(`/result?form=new`);
    }
  };

  return (
    <div className="w-full">
      <h2 className="mb-4">Detail Form:</h2>
      <Form errors={errors} onSubmit={handleSubmitForm} />
    </div>
  );
}
