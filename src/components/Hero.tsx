import Image from "next/image";

type Props = {
  imgSrc: string;
  title: string;
  description: string;
  alt?: string;
};

export default function Hero({
  imgSrc,
  title,
  description,
  alt = "Hero image",
}: Props) {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src={imgSrc}
        alt={alt}
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-10">
        <h1 className="mb-4 text-5xl md:text-7xl font-bold drop-shadow-lg">
          {title}
        </h1>
        <p className="text-xl md:text-2xl font-semibold drop-shadow-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
