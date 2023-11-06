"use client";
import Form from "@/components/Form";
import LogoColor from "@/assets/LogoColor.png";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    const { userInfo, password } = Object.fromEntries(
      new window.FormData(e.target)
    );

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userInfo, password }),
      });

      const data = await response.json();
      if (response.ok) {
        sessionStorage.setItem("userId", data.id);
        router.push("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(`Error al iniciar sesión: ${error.message}`);
    }
  };

  return (
    <main className="bg-white h-screen flex flex-col justify-center items-center gap-4">
      <Form
        image={LogoColor}
        alt="LogoColor"
        title=""
        description=""
        inputs={[
          {
            type: "text",
            name: "userInfo",
            placeholder: "Username or Email",
            required: true,
          },
          {
            type: "password",
            name: "password",
            placeholder: "Password",
            required: true,
          },
        ]}
        buttonText="Sign In"
        link1="/forgotPassword"
        linkText1="Forgot your password?"
        text2="Don't have an account yet?"
        link2="/register"
        linkText2="Sign Up"
        onSubmit={onSubmit}
      />
    </main>
  );
}
