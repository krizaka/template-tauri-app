import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

export interface FolderEntry {
  name: string;
  path: string;
  isDir: boolean;
  size: number;
  /** Seconds since the epoch. */
  modified: number;
  kind: string;
}

export interface Listing {
  entries: FolderEntry[];
  truncated: boolean;
}

/**
 * The Rust side, typed. The page has no `fs`, no shell, no opener: every call goes through the folder scope (a granted
 * folder, or a file dropped on the window this session). A product adds its own commands here.
 */
export const native = {
  folders: () => invoke<string[]>("folders"),
  grantFolder: () => invoke<string | null>("grant_folder"),
  revokeFolder: (path: string) => invoke<string[]>("revoke_folder", { path }),
  listFolder: (path: string) => invoke<Listing>("list_folder", { path }),
};

/** The paths the system reports as dropped on the window (already allowed on the Rust side). */
export const onDropped = (handler: (paths: string[]) => void) => listen<string[]>("documents-dropped", (event) => handler(event.payload));
