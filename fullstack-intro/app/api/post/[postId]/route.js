import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request, { params }) {
  // params sollte jetzt ein synchrones Objekt sein.
  const id = params.postId;

  console.log("Deleting post with id:", id);

  try {
    const post = await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error("Fehler beim Löschen des Posts:", error);

    // Wenn der Post nicht gefunden wurde (P2025), geben Sie einen 404 zurück
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: `Post mit ID ${id} nicht gefunden.` },
        { status: 404 }
      );
    }

    // Für alle anderen Fehler (z.B. DB Verbindung)
    return NextResponse.json(
      { error: "Interner Serverfehler beim Löschen." },
      { status: 500 }
    );
  }
}
