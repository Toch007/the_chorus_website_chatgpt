"use client";

import Image from "next/image";

interface Member {
  name: string;
  title: string;
  image: string;
}

export default function Card({ name, title, image }: Member) {
  return (
    <div className="bg-white dark:bg-card p-4 rounded-2xl shadow-md text-center">
      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-muted-foreground text-sm">{title}</p>
    </div>
  );
}
