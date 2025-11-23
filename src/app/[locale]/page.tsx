import { Locale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import "./styles.css";
import Hero from "@/components/Hero";
import CompanyProfileSection from "@/components/sections/CompanyProfileSection";
import ServiceList from "@/components/sections/ServiceList";
import Footer from "@/components/Footer";

type PageParams = { locale: Locale };

export default async function IndexPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "IndexPage" });
  const f = await getTranslations({ locale, namespace: "footer" });

  const HERO_IMG = "/image/hero.jpg";
  const COMPANY_IMG = "/image/company-profile.png";
  const FOOTER_IMG = "/image/Com_Logo-removebg-preview-2.png";
    const serviceCards = [
    {
      imgSrc: "/image/news1.jpg",
      title: t("ourService.card1.title"),
      alt: t("ourService.card1.alt"),
    },
    {
      imgSrc: "/image/news2.png",
      title: t("ourService.card2.title"),
      alt: t("ourService.card2.alt"),
    },
    {
      imgSrc: "/image/news3.jpg",
      title: t("ourService.card3.title"),
      alt: t("ourService.card3.alt"),
    },
    {
      imgSrc: "/image/news4.png",
      title: t("ourService.card4.title"),
      alt: t("ourService.card4.alt"),
    },
  ];

  return (
    <PageLayout>
      <Hero imgSrc={HERO_IMG} title={t("title")} description={t("description")} />
      <CompanyProfileSection t={t} imageSrc={COMPANY_IMG}/>
      <ServiceList title={t("ourService.titleList")} cards={serviceCards} />
      <Footer t={f} imgSrc={FOOTER_IMG} />
    </PageLayout>
  );
}
