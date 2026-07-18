import { NextRequest } from "next/server";
import { proxy } from "../../../lib/proxy";

export async function GET(req: NextRequest) { return proxy(req, "coinbase-crypto-realtime-data", "125000"); }
export async function POST(req: NextRequest) { return proxy(req, "coinbase-crypto-realtime-data", "125000"); }
