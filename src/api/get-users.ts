import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  const { data, error } = await supabase
    .from("users")
    .select("name, flips")
    .order("flips", { ascending: false });

  if (error) return res.status(500).json({ error });
  return res.status(200).json(data);
}
