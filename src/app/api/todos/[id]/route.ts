import connectDB from "@/lib/connect-db";
import { deleteTodo, getTodo, updateTodo } from "@/lib/todo-db";
import { createErrorResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const id = params.id;
    const { todo, error } = await getTodo(id);

    if (error) {
      throw error;
    }

    let json_response = {
      status: "success",
      data: {
        todo,
      },
    };
    return NextResponse.json(json_response);
  } catch (error: any) {
    if (typeof error === "string" && error.includes("Todo not found")) {
      return createErrorResponse("Todo not found", 404);
    }

    return createErrorResponse(error.message, 500);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const id = params.id;
    let body = await request.json();

    const { todo, error } = await updateTodo(id, body);

    if (error) {
      throw error;
    }

    let json_response = {
      status: "success",
      data: {
        todo,
      },
    };
    return NextResponse.json(json_response);
  } catch (error: any) {
    if (typeof error === "string" && error.includes("Todo not found")) {
      return createErrorResponse("Todo not found", 404);
    }

    return createErrorResponse(error.message, 500);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const id = params.id;
    const { error } = await deleteTodo(id);

    if (error) {
      throw error;
    }

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (typeof error === "string" && error.includes("Todo not found")) {
      return createErrorResponse("Todo not found", 404);
    }

    return createErrorResponse(error.message, 500);
  }
}
