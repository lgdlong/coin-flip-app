import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { name } = req.body;

  // Get current flips
  const { data: user, error: getErr } = await supabase
    .from("users")
    .select("flips")
    .eq("name", name)
    .single();

  if (getErr || !user) return res.status(404).json({ error: "User not found" });

  const { error: updateErr } = await supabase
    .from("users")
    .update({ flips: user.flips + 1 })
    .eq("name", name);

  if (updateErr) return res.status(500).json({ error: updateErr.message });

  return res.status(200).json({ flips: user.flips + 1 });
}
