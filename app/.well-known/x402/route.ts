import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    x402Version: 1,
    facilitator: { url: process.env.FACILITATOR_URL || "https://facilitator.payai.network" },
    paymentRequired: {
      scheme: "exact",
      network: "base-sepolia",
      payTo: process.env.EVM_ADDRESS || "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c",
      extra: { name: "USD Coin", version: "2" },
    },
  });
}
