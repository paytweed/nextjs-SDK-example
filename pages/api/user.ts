import { NextApiRequest, NextApiResponse } from "next";
import { authService } from "@/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authenticatedUser = authService.getAuthUser();

  console.log(req.method);

  if (req.method === "POST") {
    const updatedUser = authService.updateUser(req.body);
    res.send(updatedUser);
  }

  res.send(authenticatedUser);
}
