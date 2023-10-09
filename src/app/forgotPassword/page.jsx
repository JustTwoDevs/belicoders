"use client";
import Form from "@/components/Form";
import key from "@/assets/key.png";

export default function ForgotPassword() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const userInfo = e.target.username.value;

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/recoveryCodes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userInfo }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert("Código de recuperación enviado a tu correo electronico");
        router.push(`/verifyRecoveryCode/${data.userId}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(
        `Error al verificar el código de recuperación: ${error.message}`
      );
    }
  };

  return (
    <main className="bg-white h-screen flex flex-col justify-center items-center gap-4">
      <Form
        image={key}
        alt="key"
        title="¿Do you have problems to login?"
        description="Enter your email or username and we&rsquo;ll send you a link to log
        back into your account."
        inputs={[
          {
            type: "text",
            id: "username",
            placeholder: "Username or Email",
          },
        ]}
        buttonText="Send Recovery Code"
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
