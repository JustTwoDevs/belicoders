"use client";
import Image from "next/image";

const imageLoader = ({ src, width }) => {
  return `https://picsum.photos/${width}/${800}?${src}`;
};

export default function DevTeamCard({ name, imgsrc }) {
  return (
    <div className="flex justify-center items-center bg-primary-200 rounded-xl">
      <Image
        className="max-w-[95%] max-h-[95%] rounded-xl"
        loader={imageLoader}
        alt={name}
        src={imgsrc}
        width={500}
        height={700}
      />
    </div>
  );
}
