import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { name } = req.body;

  const { data, error } = await supabase
    .from("users")
    .upsert({ name, flips: 0 }, { onConflict: "name" });

  if (error) return res.status(500).json({ error });
  return res.status(200).json({ message: "User created or exists", data });
}
