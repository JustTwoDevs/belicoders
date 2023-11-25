"use client";
import Form from "@/components/Form";
import password from "@/assets/password.png";

export default function ResetPassword() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/resetPassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ newPassword }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert(data.message);
        router.push("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(`Error al restablecer la contraseña: ${error.message}`);
    }
  };

  return (
    <main className="bg-white h-screen flex flex-col justify-center items-center gap-4">
      <Form
        image={password}
        alt="key"
        title="Change your password"
        description="Enter a new password for your account."
        inputs={[
          {
            type: "text",
            name: "newPassword",
            placeholder: "New Password",
          },
        ]}
        buttonText="Reset Password"
        link1="/login"
        linkText1="Sign In"
        text2="Don't have an account yet?"
        link2="/register"
        linkText2="Sign Up"
        onSubmit={onSubmit}
      />
    </main>
  );
}
