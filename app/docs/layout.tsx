import { getAllDocs } from '@/lib/docs';
import DocsSidebar from '@/components/docs/DocsSidebar';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const docs = getAllDocs();

  return (
    <div className="container-wide grid grid-cols-1 gap-12 py-16 md:grid-cols-[240px_1fr] md:gap-16">
      <aside className="md:sticky md:top-24 md:self-start">
        <DocsSidebar docs={docs} />
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
