import { NextRequest, NextResponse } from "next/server";

const TREASURY = "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c";
const PAYAI = "https://facilitator.payai.network";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";

const routes: Record<string, { price: string; desc: string }> = {
  "/api/crypto-news": { price: "55978", desc: "Cryptocurrency news feed" },
  "/api/crypto-news51": { price: "76666", desc: "Crypto news aggregator 51" },
  "/api/crypto-news16": { price: "146272", desc: "Crypto news feed 16" },
  "/api/crypto-news54": { price: "142946", desc: "Crypto news feed 54" },
  "/api/password-gen": { price: "53979", desc: "Secure password generator" },
  "/api/apiton": { price: "68723", desc: "APITON crypto data" },
  "/api/crypto-exchange": { price: "130964", desc: "Real-time crypto exchange rates" },
  "/api/screener-official": { price: "84958", desc: "Official crypto screener" },
  "/api/screener": { price: "51503", desc: "Crypto market screener" },
  "/api/coinbase-realtime": { price: "140681", desc: "Coinbase real-time data" },
  "/api/coinbase": { price: "107667", desc: "Coinbase crypto API" },
  "/api/wallet-validator": { price: "143043", desc: "Crypto wallet address validator" },
  "/api/crypto-list": { price: "71916", desc: "Cryptocurrencies list" },
  "/api/chaincheck": { price: "144192", desc: "Blockchain chain checker" },
  "/api/ton-fragment": { price: "52126", desc: "TON Fragment data" },
  "/api/cryptography": { price: "107488", desc: "Cryptography utilities" }
};

const hostMap: Record<string, string> = {
  "crypto-news": "cryptocurrency-news2.p.rapidapi.com",
  "crypto-news51": "crypto-news51.p.rapidapi.com",
  "crypto-news16": "crypto-news16.p.rapidapi.com",
  "crypto-news54": "crypto-news54.p.rapidapi.com",
  "password-gen": "password-generator-api-apiverve.p.rapidapi.com",
  "apiton": "apiton.p.rapidapi.com",
  "crypto-exchange": "real-time-crypto-exchange-api.p.rapidapi.com",
  "screener-official": "crypto-screener-official-api.p.rapidapi.com",
  "screener": "crypto-screener-api.p.rapidapi.com",
  "coinbase-realtime": "coinbase-crypto-realtime-data-api.p.rapidapi.com",
  "coinbase": "coinbase-crypto-api.p.rapidapi.com",
  "wallet-validator": "crypto-wallet-address-validator1.p.rapidapi.com",
  "crypto-list": "fetches-cryptocurrencies-list1.p.rapidapi.com",
  "chaincheck": "chaincheck-api.p.rapidapi.com",
  "ton-fragment": "ton-fragment.p.rapidapi.com",
  "cryptography": "cryptography-apis.p.rapidapi.com",
};

async function verifyPayment(header: string, requirements: any): Promise<any> {
  const payload = JSON.parse(Buffer.from(header, "base64").toString("utf8"));
  try {
    const res = await fetch(`${PAYAI}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentPayload: payload, paymentRequirements: requirements }),
    });
    const r = await res.json();
    if (r.isValid) return { ...r, facilitator: "payai" };
  } catch {}
  return { isValid: false, invalidReason: "payai_verify_failed" };
}

async function settlePayment(header: string, requirements: any): Promise<any> {
  const payload = JSON.parse(Buffer.from(header, "base64").toString("utf8"));
  try {
    const res = await fetch(`${PAYAI}/settle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentPayload: payload, paymentRequirements: requirements }),
    });
    return await res.json();
  } catch (e: any) {
    return { success: false, errorReason: e.message };
  }
}

export async function proxy(req: NextRequest): Promise<NextResponse> {
  const path = req.nextUrl.pathname;
  const slug = path.split("/api/")[1]?.split("/")[0];
  const route = routes[`/api/${slug}`];

  if (!path.startsWith("/api/") || !route) {
    return NextResponse.next();
  }

  const paymentHeader = req.headers.get("PAYMENT-SIGNATURE") || req.headers.get("payment-signature");

  if (!paymentHeader) {
    const requirements = {
      x402Version: 2,
      error: "Payment required",
      resource: { url: `${req.nextUrl.origin}${path}`, description: route.desc, mimeType: "application/json" },
      accepts: [{
        scheme: "exact", network: "eip155:8453", amount: route.price,
        asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        payTo: TREASURY, maxTimeoutSeconds: 300,
        extra: { name: "USD Coin", version: "2" }
      }],
    };
    const encoded = Buffer.from(JSON.stringify(requirements)).toString("base64");
    const res = NextResponse.json({}, { status: 402 });
    res.headers.set("Payment-Required", encoded);
    return res;
  }

  try {
    const requirements = {
      scheme: "exact", network: "eip155:8453", amount: route.price,
      payTo: TREASURY, maxTimeoutSeconds: 300,
      asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      extra: { name: "USD Coin", version: "2" }
    };
    const verified = await verifyPayment(paymentHeader, requirements);
    if (!verified.isValid) {
      return NextResponse.json({ error: "Invalid payment", reason: verified.invalidReason }, { status: 402 });
    }
    const response = NextResponse.next();
    settlePayment(paymentHeader, requirements).catch((e: any) => console.error("Settle:", e));
    return response;
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export const config = { matcher: ["/api/:path*"] };
