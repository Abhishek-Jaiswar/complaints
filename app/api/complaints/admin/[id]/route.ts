import connectDb from "@/lib/database";
import { Complaints } from "@/models/complaints";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        {
          message: "id is required",
          success: false,
        },
        { status: 401 }
      );
    }

    const complaint = await Complaints.findById({ id });
    if (!complaint) {
      return NextResponse.json(
        {
          message: "Complaint not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        complaint,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server Error", success: false },
      { status: 500 }
    );
  }
}
