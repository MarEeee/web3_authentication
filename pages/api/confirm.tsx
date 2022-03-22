import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { users } from "../../utils/client";

export default function transactionCheck(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let authenticated = false;

  const { address1, signature } = req.query;
  const user = users[address1 as string];
  const address = address1 as string;
  const decodedAddress = ethers.utils.verifyMessage(
    user.nonce.toString(),
    signature as string
  );
  if (address.toLowerCase() === decodedAddress.toLowerCase())
    authenticated = true;
  res.status(200).json({ authenticated });
}