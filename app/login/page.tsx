'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    await supabase.auth.signUp({ email, password });
    alert('Check your email!');
  };

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else alert('Logged in!');
  };

  return (
    <div className="p-10">
      <h1 className="text-xl mb-4">Login / Signup</h1>

      <input
        className="border p-2 block mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 block mb-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="bg-blue-500 text-white p-2 mr-2" onClick={signIn}>
        Login
      </button>

      <button className="bg-green-500 text-white p-2" onClick={signUp}>
        Sign Up
      </button>
    </div>
  );
}