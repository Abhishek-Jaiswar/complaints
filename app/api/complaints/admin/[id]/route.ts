import connectDb from "@/lib/database";
import { Complaints } from "@/models/complaints";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { message: "id is required", success: false },
        { status: 400 }
      );
    }

    const complaint = await Complaints.findById(id);

    if (!complaint) {
      return NextResponse.json(
        { message: "Complaint not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, complaint }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  await connectDb();
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  await Complaints.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
