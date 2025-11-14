import { Locale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import "./styles.css";
import Hero from "@/components/Hero";
import CompanyProfileSection from "@/components/sections/CompanyProfileSection";
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

  return (
    <PageLayout>
      <Hero imgSrc={HERO_IMG} title={t("title")} description={t("description")} />
      <CompanyProfileSection t={t} imageSrc={COMPANY_IMG} />
      <Footer t={f} imgSrc={FOOTER_IMG} />
    </PageLayout>
  );
}
