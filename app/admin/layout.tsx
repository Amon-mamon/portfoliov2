// app/admin/layout.tsx
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Only wrap children, do not add Header or Footer here!
    <section >
      {children}
    </section>
  );
}