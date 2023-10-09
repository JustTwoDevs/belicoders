"use client";

import React, { useState, useRef } from "react";
import { calculateAge } from "./calculateAge";
import RegistrationForm from "../../components/RegistrationForm";

export default function Page() {
  return (
    <main className="bg-white min-h-screen flex flex-col justify-center items-center gap-4 py-5">
      <RegistrationForm />
    </main>
  );
}
