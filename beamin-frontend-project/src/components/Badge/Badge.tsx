export default function Badge({ children }: { children?: React.ReactNode }) {
  return (
    <div className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full border border-transparent bg-primary p-0 text-xs font-medium text-primary-foreground ring-2 ring-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
      {children}
    </div>
  );
}
