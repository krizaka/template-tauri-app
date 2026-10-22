import { Button } from "@krizaka/ui/button";
import { useEffect, useState } from "react";

import { native } from "./native";

/** The first window: the folders the person granted. Replace it with the product's own screens, built from @krizaka/ui blocks. */
export function App() {
  const [folders, setFolders] = useState<string[]>([]);
  useEffect(() => void native.folders().then(setFolders), []);
  return (
    <main className="mx-auto flex h-full max-w-xl flex-col justify-center gap-4 px-6">
      <h1 className="text-2xl font-semibold">__Name__</h1>
      <ul className="flex flex-col gap-1 text-fg-secondary">
        {folders.map((folder) => (
          <li key={folder}>{folder}</li>
        ))}
      </ul>
      <Button onClick={() => void native.grantFolder().then(() => native.folders().then(setFolders))}>Add a folder</Button>
    </main>
  );
}
