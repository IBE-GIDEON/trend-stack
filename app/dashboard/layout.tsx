import { NotionProvider } from "@/lib/notion-context";
import { NotionShell } from "@/components/layout/NotionShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotionProvider>
      <NotionShell>{children}</NotionShell>
    </NotionProvider>
  );
}
