import { generateMeta } from "@/lib/utils";
import { FileManager } from "./components/file-manager";

export async function generateMetadata() {
  return generateMeta({
    title: "File Manager App",
    description:
      "Knowledge manager.",
    canonical: "/file-manager"
  });
}

export default function Page() {
  return <FileManager />;
}