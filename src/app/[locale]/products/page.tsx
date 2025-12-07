import { Locale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import "../styles.css";
import ProductSection from "@/components/sections/ProductSection";

import Footer from "@/components/Footer";

type PageParams = { locale: Locale };

export default async function ProductsPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const p = await getTranslations({ locale, namespace: "ProductsPage" });
  const f = await getTranslations({ locale, namespace: "footer" });

  const FOOTER_IMG = "/image/Com_Logo-removebg-preview-2.png";

  const productCards = [
    // HWACHIN (TAIWAN) – 4 series
    {
      id: "hwachin_hrw-ae-ie",
      brandKey: "hwachin",
      brandLabel: p("brands.hwachin.label"),
      imgSrc: "/image/news1.jpg",
      title: p("productsCategories.hrw.title"),
      description: p("productsCategories.hrw.description"),
      standard: p("productsCategories.hrw.standard"),
      alt: p("productsCategories.hrw.alt"),
      specDownloadPath: "/specs/hwachin_hrw-ae-ie.pdf",
    },
    {
      id: "hwachin_hc-se",
      brandKey: "hwachin",
      brandLabel: p("brands.hwachin.label"),
      imgSrc: "/image/news2.png",
      title: p("productsCategories.hc-se-te.title"),
      description: p("productsCategories.hc-se-te.description"),
      standard: p("productsCategories.hc-se-te.standard"),
      alt: p("productsCategories.hc-se-te.alt"),
      specDownloadPath: "/specs/hwachin_hc-se.pdf",
    },
    {
      id: "hwachin_hc-ae-ie",
      brandKey: "hwachin",
      brandLabel: p("brands.hwachin.label"),
      imgSrc: "/image/news3.jpg",
      title: p("productsCategories.hc-ae-ie.title"),
      description: p("productsCategories.hc-ae-ie.description"),
      standard: p("productsCategories.hc-ae-ie.standard"),
      alt: p("productsCategories.hc-ae-ie.alt"),
      specDownloadPath: "/specs/hwachin_hc-ae-ie.pdf",
    },
    {
      id: "hwachin_dc_dcw-se",
      brandKey: "hwachin",
      brandLabel: p("brands.hwachin.label"),
      imgSrc: "/image/news4.png",
      title: p("productsCategories.dc-se-dcw-se.title"),
      description: p("productsCategories.dc-se-dcw-se.description"),
      standard: p("productsCategories.dc-se-dcw-se.standard"),
      alt: p("productsCategories.dc-se-dcw-se.alt"),
      specDownloadPath: "/specs/hwachin_dc_dcw-se.pdf",
    },

    // RIJIN (CHINA) – 2 series
    {
      id: "rijin_rs_single",
      brandKey: "rijin",
      brandLabel: p("brands.rijin.label"),
      imgSrc: "/image/news4.png", // TODO: update to your real image path
      title: p("productsCategories.rj-s1.title"),
      description: p("productsCategories.rj-s1.description"),
      standard: p("productsCategories.rj-s1.standard"),
      alt: p("productsCategories.rj-s1.alt"),
      specDownloadPath: "/specs/rijin-rs-single.pdf",
    },
    {
      id: "rijin_rs_mixed",
      brandKey: "rijin",
      brandLabel: p("brands.rijin.label"),
      imgSrc: "/image/news4.png", // TODO: update to your real image path
      title: p("productsCategories.rj-s2.title"),
      description: p("productsCategories.rj-s2.description"),
      standard: p("productsCategories.rj-s2.standard"),
      alt: p("productsCategories.rj-s2.alt"),
      specDownloadPath: "/specs/rijin-rs-mixed.pdf",
    },
  ];

  return (
    <PageLayout>
      <ProductSection cards={productCards} />
      <Footer t={f} imgSrc={FOOTER_IMG} />
    </PageLayout>
  );
}
