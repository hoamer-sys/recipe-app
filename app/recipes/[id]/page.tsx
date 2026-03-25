// app/recipes/[slug]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";

// TypeScript type for your recipe
type Recipe = {
  id: number;
  slug: string;
  title: string;
  ingredients: string;
  instructions: string;
  [key: string]: any;
};

interface RecipePageProps {
  params: {
    slug: string; // comes from URL
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = params;

  // Fetch recipe by slug
  const { data: recipe, error } = await supabase
    .from<Recipe>("recipes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !recipe) {
    console.error("Supabase fetch error:", error);
    return notFound(); // shows 404 page
  }

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