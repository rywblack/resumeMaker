export default function SectionHeading({ children }: { children: string }) {
  return (
    <div className="mt-6 mb-2">
      <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{children}</h2>
      <div
        className="h-[1px] mt-1"
        style={{ backgroundColor: "#d1d5db" }}
      ></div>
    </div>
  );
}

