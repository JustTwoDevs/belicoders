"use client";
import { useState } from "react";

export default function Card({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="w-full" type="button">
        ¿Que es HBO Max?
      </button>
      <section>
        <div class="sc-jrAFXE dAUKNh text rich-text w-100 w-100">
          <div class="text-center">
            <p class="text-left">
              HBO Max es la nueva plataforma de streaming que reúne todos los
              contenidos de HBO junto con aún más éxitos de taquilla, series
              generadoras de obsesión y exclusivos Max Originals.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
