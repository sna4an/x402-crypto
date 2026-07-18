import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest, host: string, price: string) {
  const paymentHeader = req.headers.get("x-payment");
  if (!paymentHeader) {
    const payload = Buffer.from(
      JSON.stringify({
        x402Version: 2,
        accepts: [
          {
            scheme: "exact",
            network: "eip155:8453",
            amount: price,
            resource: req.url,
            description: "Paid API endpoint",
            mimeType: "application/json",
            payTo: process.env.EVM_ADDRESS || "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c",
            extra: { name: "USD Coin", version: "2" },
          },
        ],
    extensions: {
      bazaar: {
        info: {
          input: {
            type: "http",
            method: "POST",
            bodyType: "json",
            body: {
              type: "object",
              properties: {
                query: { type: "string", description: "Input parameter" }
              }
            }
          },
          output: {
            type: "object",
            properties: {
              result: { type: "object", description: "API response data" }
            },
            example: { result: { data: "example response" } }
          }
        },
        schema: {
          type: "object",
          properties: {
            result: { type: "object", description: "API response data" }
          }
        }
      }
    }
      })
    ).toString("base64");
    return NextResponse.json(
      {},
      { status: 402, headers: { "Payment-Required": payload } }
    );
  }

  const rapidKey = process.env.RAPIDAPI_KEY || "";
  const url = new URL(req.url);
  const pathParts = url.pathname.split("/").filter(Boolean);
  const subPath = pathParts.length > 2 ? "/" + pathParts.slice(2).join("/") : "";
  const targetUrl = `https://${host}.p.rapidapi.com${subPath}${url.search}`;

  const headers: Record<string, string> = {
    "x-rapidapi-key": rapidKey,
    "x-rapidapi-host": `${host}.p.rapidapi.com`,
  };

  const init: RequestInit = { method: req.method, headers };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.text();
  }

  try {
    const resp = await fetch(targetUrl, init);
    const data = await resp.text();
    return new NextResponse(data, {
      status: resp.status,
      headers: { "Content-Type": resp.headers.get("Content-Type") || "application/json" },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 502 });
  }
}