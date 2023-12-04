"use client";
import Image from "next/image";

export default function Card({ name, img, description, color }) {
  return (
    <div
      className={`flex justify-center items-center rounded-xl p-5 gap-7 ${color}`}
    >
      <section>
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p className="text-xl font-light">{description}</p>
      </section>
      <Image
        src={img}
        alt={name}
        className="self-center"
        width={200}
        height={200}
      />
    </div>
  );
}
