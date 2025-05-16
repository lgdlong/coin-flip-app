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
    // file chưa tồn tại hoặc lỗi => tạo mới
    fs.writeFileSync(filePath, "{}");
  }

  if (!(name in data)) {
    (data as any)[name] = 0;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return res.status(200).json({ message: "User added or already exists" });
}
