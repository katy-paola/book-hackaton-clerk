import { Tables } from "@/types/database.types";

export type SavedRow = Tables<'saved'>

export type SaveBookResult = 
  | { success: true; saved: boolean; data: SavedRow | null }
  | { error: string; success?: never } 