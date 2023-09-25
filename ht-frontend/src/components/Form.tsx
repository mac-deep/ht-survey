import React from 'react';
import { TUser, TUserPayload } from '../types/user.types';
import { useForm } from 'react-hook-form';
import { Response } from '../types/response.types';

type TFormProps = {
  onSubmit: (payload: TUserPayload) => Promise<void>;
  userData?: TUser;
  errors?: string[] | null;
};

export default function Form({ onSubmit, userData, errors }: TFormProps) {
  const IS_NEW_FLAG = !userData;

  const { register, handleSubmit, reset } = useForm<TUserPayload>({
    values: {
      dob: userData?.dob!,
      email: userData?.email!,
      fullName: userData?.fullName!,
      phoneNo: userData?.phoneNo!,
    },
    defaultValues: {
      dob: undefined,
      email: undefined,
      fullName: undefined,
      phoneNo: undefined,
    },
  });

  const messages =
    errors?.length &&
    errors?.map((msg) => (
      <p key={msg} className="alert alert-error text-sm">
        {msg}
      </p>
    ));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Full Name"
        required
        {...register('fullName')}
        className="input input-bordered w-full"
      />
      <input
        type="email"
        required
        {...register('email')}
        placeholder="Email"
        className="input input-bordered w-full"
      />
      <input
        type="date"
        required
        {...register('dob')}
        placeholder="Date"
        className="input input-bordered w-full"
      />
      <input
        type="number"
        required
        maxLength={10}
        prefix="+91"
        {...register('phoneNo')}
        placeholder="Phone no."
        className="input input-bordered w-full"
      />

      {messages}

      <button type="submit" className="w-full mt-4 btn btn-primary">
        Submit
      </button>
      <button
        type="button"
        onClick={() => reset()}
        className="w-full btn btn-ghost"
      >
        {IS_NEW_FLAG ? 'Clear' : 'Reset to default'}
      </button>
    </form>
  );
}
