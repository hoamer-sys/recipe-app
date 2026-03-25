export const dynamic = 'force-dynamic';
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
          <p className="whitespace-pre-line"></p>
          <div>
  <strong>Ingredients:</strong>
  {recipe.ingredients.split('\n').map((line: string, i: number) => (
    <div key={i}>{line}</div>
  ))}
</div>

<div>
  <strong>Instructions:</strong>
  {recipe.instructions.split('\n').map((line: string, i: number) => (
    <div key={i}>{line}</div>
  ))}
</div>
        </div>
      ))}
    </div>
  );
}