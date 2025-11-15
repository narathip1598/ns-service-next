import { Locale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import "../styles.css";
import OurServiceSection from "@/components/sections/OurServiceSection";

import Footer from "@/components/Footer";

type PageParams = { locale: Locale };

export default async function ServicesPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "IndexPage" });
  const f = await getTranslations({ locale, namespace: "footer" });

  const serviceCards = [
    {
      imgSrc: "/image/news1.jpg",
      title: t("ourService.card1.title"),
      description: t("ourService.card1.description"),
      alt: t("ourService.card1.alt"),
    },
    {
      imgSrc: "/image/news2.png",
      title: t("ourService.card2.title"),
      description: t("ourService.card2.description"),
      alt: t("ourService.card2.alt"),
    },
    {
      imgSrc: "/image/news3.jpg",
      title: t("ourService.card3.title"),
      description: t("ourService.card3.description"),
      alt: t("ourService.card3.alt"),
    },
    {
      imgSrc: "/image/news4.png",
      title: t("ourService.card4.title"),
      description: t("ourService.card4.description"),
      alt: t("ourService.card4.alt"),
    },
  ];

  const FOOTER_IMG = "/image/Com_Logo-removebg-preview-2.png";

  return (
    <PageLayout>
      <OurServiceSection t={t} cards={serviceCards}/>
      <Footer t={f} imgSrc={FOOTER_IMG} />
    </PageLayout>
  );
}
