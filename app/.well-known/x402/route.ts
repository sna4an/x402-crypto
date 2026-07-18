import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SLUGS = [
  "apiton", "chaincheck", "coinbase", "coinbase-realtime",
  "crypto-exchange", "crypto-list", "crypto-news", "crypto-news16",
  "crypto-news51", "crypto-news54", "cryptography", "password-gen",
  "screener", "screener-official", "ton-fragment", "wallet-validator"
];

export async function GET() {
  const resources = SLUGS.map((slug) => `https://x402-crypto.vercel.app/api/${slug}`);
  return NextResponse.json({ version: 1, resources });
}
