import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mt-2">
        Oops! This page does not exist.
      </p>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-primary hover:bg-secondary duration-300 cursor-pointer text-white rounded"
      >
        Go Back Home
      </Link>
    </div>
  );
}
