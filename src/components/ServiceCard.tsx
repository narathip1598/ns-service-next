import Image from 'next/image';

type Props = {
  imgSrc: string;
  title: string;
  alt: string;
};

export default function ServiceCard({ imgSrc, title, alt }: Props) {
  return (
    <article className="space-y-3">
      <div className="relative w-full overflow-hidden rounded-xl aspect-[16/10]">
        <Image src={imgSrc} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
      </div>
      <h3 className="text-xl font-extrabold">{title}</h3>
    </article>
  );
}
