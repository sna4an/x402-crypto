import { NextRequest } from "next/server";
import { proxy } from "../../../lib/proxy";

export async function GET(req: NextRequest) { return proxy(req, "crypto-news54", "75000"); }
export async function POST(req: NextRequest) { return proxy(req, "crypto-news54", "75000"); }
