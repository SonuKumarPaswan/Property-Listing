export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>
        {children}
      </main>
    </div>
  );
}