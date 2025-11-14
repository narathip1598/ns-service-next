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
    <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10">
        <h1 className="mb-4 text-5xl font-bold">{title}</h1>
        <p className="text-xl font-semibold">{description}</p>
      </div>
    </div>
  );
}
