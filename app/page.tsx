import Link from "next/link";
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

      <div>
        {recipes?.map((recipe) => {
          return (
            <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
              <div className="border p-4 rounded hover:bg-gray-50 cursor-pointer mb-4">
                <h2 className="text-lg font-semibold">{recipe.title}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}