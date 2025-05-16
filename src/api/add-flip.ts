import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { name } = req.body;
  const filePath = path.resolve(__dirname, "../../users.json");

  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    return res.status(500).json({ error: "Cannot read data file" });
  }

  if (!(name in data)) {
    (data as any)[name] = 1;
  } else {
    (data as any)[name]++;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return res.status(200).json({ flips: (data as any)[name] });
}
