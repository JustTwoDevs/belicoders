import VerifyCodeC from "@/components/VerifyCodeC";

export default function VerifyRecoveryCode({ params }) {
  return (
    <main className="bg-[#241f35] text-white flex justify-center">
      <VerifyCodeC userId={params.id} />
    </main>
  );
}
