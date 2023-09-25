'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [username, setUsername] = useState<string>();

  return (
    <>
      <h2 className="w-full text-lg font-bold mb-2">Enter your username</h2>
      <div className="flex flex-col gap-2 w-full">
        <input
          type="text"
          placeholder="username"
          className="input w-full input-primary"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Link
          typeof="button"
          href={{
            pathname: '/form',
            query: { username },
          }}
          className={`btn w-full ${username ? 'btn-primary' : 'btn-disabled'}`}
        >
          Enter
        </Link>
      </div>
    </>
  );
}
