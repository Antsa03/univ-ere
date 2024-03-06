"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Password from "./Password";
import { navigate } from "@/hooks/navigate";

function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (res?.error) {
        alert(res?.error);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigationResetPassword = () => {
    if (user.email === "") {
      return;
    }
    router.push(`/password-reset/${user.email}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col align-baseline sm:w-[400px] sm:mb-4 p-0">
          <label className="label">Email *</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(event) => handleInputChange(event)}
            className=""
            required
            placeholder="xxxxx@example.com"
          />
        </div>
        <Password
          password={user.password}
          handleInputChange={handleInputChange}
        />
        <button type="submit">Se connecter</button>
      </form>
      <button onClick={handleNavigationResetPassword}>
        Mot de passe oublié?
      </button>
    </div>
  );
}

export default Login;
