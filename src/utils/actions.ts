"use server";

import { redirect } from "next/navigation";
import paths from "@/app/paths";

export async function navigate() {
  redirect(`${paths.library}`);
}

