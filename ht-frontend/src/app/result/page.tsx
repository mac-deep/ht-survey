'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const form = searchParams.get('form');

  https: return (
    <div className="w-full">
      <div className="h-40 flex justify-center mb-4 items-center alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>
          {form === 'updated' && 'Submission Updated!'}
          {form === 'new' && 'Successfully Submitted!'}
        </span>
      </div>

      <Link href={'/'} className="btn w-full btn-neutral">
        Back to Home
      </Link>
    </div>
  );
}
