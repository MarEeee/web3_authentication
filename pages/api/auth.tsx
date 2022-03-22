import type { NextApiRequest, NextApiResponse } from "next";

import { users } from "../../utils/client";
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;
  let user = users[address as string];

  // check if user exists in register
  if (!user) {
    user = {
      address,
      // update user nonce
      nonce: Math.floor(Math.random() * 10000000),
    };
    users[address as string] = user;
  } else {
    // create nonce for new user
    const nonce = Math.floor(Math.random() * 10000000);
    // assign nonce to new user
    user.nonce = nonce;
    users[address as string] = user;
  }
  res.status(200).json(user);
}