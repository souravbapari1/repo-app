import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 w-full h-screen text-white flex-col gap-5 text-center flex justify-center items-center">
      <h1 className="text-8xl font-extrabold">404</h1>
      <p>Page not found</p>
      <Link href="/">
        <Button
          variant="secondary"
          className="font-bold px-5 shadow-none mt-4"
          size="sm"
        >
          Go Home
        </Button>
      </Link>
    </div>
  );
}

export default NotFound;
