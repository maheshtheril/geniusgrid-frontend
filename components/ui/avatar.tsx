"use client";

export function Avatar({ name }: { name: string }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
