'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AddRecipe() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const submitRecipe = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert('You must be logged in');
      return;
    }

    const { error } = await supabase.from('recipes').insert([
      {
        title,
        ingredients,
        instructions,
        user_id: user.id
      }
    ]);

    if (error) alert(error.message);
    else alert('Recipe added!');
  };

  return (
    <div className="p-10">
      <h1 className="text-xl mb-4">Add Recipe</h1>

      <input
        className="border p-2 block mb-2"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 block mb-2"
        placeholder="Ingredients"
        onChange={(e) => setIngredients(e.target.value)}
      />

      <textarea
        className="border p-2 block mb-2"
        placeholder="Instructions"
        onChange={(e) => setInstructions(e.target.value)}
      />

      <button className="bg-blue-500 text-white p-2" onClick={submitRecipe}>
        Submit
      </button>
    </div>
  );
}