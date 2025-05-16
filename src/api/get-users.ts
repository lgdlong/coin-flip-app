import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

export default function handler(_: VercelRequest, res: VercelResponse) {
  const filePath = path.resolve(__dirname, "../../users.json");

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return res.status(200).json(JSON.parse(data));
  } catch (err) {
    return res.status(500).json({ error: "Cannot read data file" });
  }
}
