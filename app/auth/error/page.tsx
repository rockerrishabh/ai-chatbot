import Link from "next/link";

function Error() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Error</h1>
      <p className="font-semibold">Something Went Wrong!</p>
      <Link className="hover:text-indigo-500" href={"/"}>
        Back to Home
      </Link>
    </div>
  );
}

export default Error;
