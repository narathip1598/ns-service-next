import { Locale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import "../styles.css";

import Footer from "@/components/Footer";

type PageParams = { locale: Locale };

export default async function ProductsPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "IndexPage" });
  const f = await getTranslations({ locale, namespace: "footer" });

 

  const FOOTER_IMG = "/image/Com_Logo-removebg-preview-2.png";

  return (
    <PageLayout>

      <Footer t={f} imgSrc={FOOTER_IMG} />
    </PageLayout>
  );
}
