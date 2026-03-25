// app/recipes/[id]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";

interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  [key: string]: any;
}

interface RecipePageProps {
  params: {
    id: string; // comes from the URL
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipeId = Number(params.id);

  if (isNaN(recipeId)) {
    return notFound(); // invalid id
  }

  // Fetch recipe by numeric ID
  const { data, error } = await supabase
    .from("recipes")    // no generics
    .select("*")
    .eq("id", recipeId)
    .single();

  if (error || !data) {
    console.error("Supabase fetch error:", error);
    return notFound();
  }

  const recipe = data as Recipe;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

      {recipe.ingredients && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <pre className="whitespace-pre-wrap">{recipe.ingredients}</pre>
        </section>
      )}

      {recipe.instructions && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <pre className="whitespace-pre-wrap">{recipe.instructions}</pre>
        </section>
      )}
    </div>
  );
}