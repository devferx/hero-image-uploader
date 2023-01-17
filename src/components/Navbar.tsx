import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export const Navbar = () => {
  const { data: session } = useSession();

  const login = () => {
    signIn();
  };

  const logout = () => {
    signOut();
  };

  return (
    <header className="flex justify-between py-3 px-5">
      <Link
        style={{
          textDecoration: "none",
        }}
        href="/"
      >
        <span className="font-poppins font-bold text-xl text-black">
          🦸 Hero Image Uploader
        </span>
      </Link>
      {session ? (
        <div className="flex items-center gap-3 w-max">
          <Link href="/user-images">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={session.user!.image!}
              alt={session.user!.name || "User Profile"}
            />
          </Link>

          <button
            className="font-poppins font-bold text-black"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <button className="font-poppins font-bold text-black" onClick={login}>
          Login
        </button>
      )}
    </header>
  );
};
