"use client";
import Form from "@/components/Form";
import verify from "@/assets/verify.png";

export default function VerifyCode({ params }) {
  const onSubmit = async (e) => {
    e.preventDefault();
    const verifyCode = e.target.verifyCode.value;
    console.log(verifyCode);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/verifyRecoveryCode`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ userId: params.userId, verifyCode }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert("Código de recuperación correcto");
        router.push(`/resetPassword`);
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
        image={verify}
        alt="verify"
        title="¿Have you received your recovery code?"
        description="Enter your verification Code"
        inputs={[
          {
            type: "text",
            name: "verifyCode",
            placeholder: "Enter verification code",
          },
        ]}
        buttonText="Verify code"
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
