import { supabase } from '../lib/supabaseClient';

export default async function Home() {
  const { data: recipes } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Recipes</h1>

      {recipes?.map((recipe) => (
        <div key={recipe.id} className="border p-4 mb-4">
          <h2 className="text-xl">{recipe.title}</h2>
          <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
          <p><strong>Instructions:</strong> {recipe.instructions}</p>
        </div>
      ))}
    </div>
  );
}