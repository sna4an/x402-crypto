import { NextRequest } from "next/server";
import { proxy } from "../../../../lib/proxy";

export async function GET(req: NextRequest) {
  return proxy(req, "ton-fragment", "100000");
}
export async function POST(req: NextRequest) {
  return proxy(req, "ton-fragment", "100000");
}
export async function PUT(req: NextRequest) {
  return proxy(req, "ton-fragment", "100000");
}
export async function DELETE(req: NextRequest) {
  return proxy(req, "ton-fragment", "100000");
}
export async function PATCH(req: NextRequest) {
  return proxy(req, "ton-fragment", "100000");
}
