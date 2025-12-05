import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const res = await request.json();
  const { title, content } = res;

  // logging
  console.log("Adding post:");
  console.log(res);
  // writing post to db
  const result = await prisma.post.create({
    data: {
      title,
      content,
      published: true,
      author: {
        create: {
          name: "blacksquirrel",
        },
      },
    },
  });

  return NextResponse.json({ result });
}
