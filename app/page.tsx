"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "authenticated")
    return (
      <div>
        <button onClick={() => signOut()}>Se déconnecter</button>
        <h1>Vous êtes connectés</h1>
      </div>
    );

  if (status === "loading") return <h1>Chargement ...</h1>;
  if (!session) router.push("/login");
  return <div></div>;
}
