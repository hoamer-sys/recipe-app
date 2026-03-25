// app/recipes/[slug]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";

interface Recipe {
  id: number;
  slug: string;
  title: string;
  ingredients: string;
  instructions: string;
  [key: string]: any;
}

interface RecipePageProps {
  params: {
    slug: string;
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = params;

  // ✅ Correct Supabase fetch for v2
  const { data, error } = await supabase
    .from("recipes")       // no generics here
    .select("*")           // just string, no <Recipe>
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Supabase fetch error:", error);
    return notFound();
  }

  const recipe = data as Recipe; // type assertion for TypeScript

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