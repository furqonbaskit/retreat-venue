"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-zinc-300 border-t-blue-500"></div>
    </div>
  );
}