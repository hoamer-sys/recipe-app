import { createClient } from "@/lib/supabase/server";

export default async function RecipePage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { data: recipe, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", Number(params.id))
    .single();

  if (error || !recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{recipe.title}</h1>

      <h2 className="mt-6 font-semibold">Ingredients</h2>
      <p className="whitespace-pre-line">{recipe.ingredients}</p>

      <h2 className="mt-6 font-semibold">Instructions</h2>
      <p className="whitespace-pre-line">{recipe.instructions}</p>
    </div>
  );
}