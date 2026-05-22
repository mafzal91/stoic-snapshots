export function NoBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col grow p-2 rounded-md">
      <div className="relative flex flex-col grow h-full rounded-md">
        {children}
      </div>
    </div>
  );
}
