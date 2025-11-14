import Link from "next/link";
import type { getTranslations } from "next-intl/server";
import Image from 'next/image';
import CompanyLogo from '@/image/Com_Logo.png';
import {
  Phone,
  Mail,
  Facebook,
} from "lucide-react";


// Same type as returned by getTranslations<'footer'>
type FooterT = Awaited<ReturnType<typeof getTranslations<"footer">>>;

type FooterProps = {
  t: FooterT;
};

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-slate-900/90 text-sm text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* LEFT: Company Logo */}
          <div className="w-full lg:w-1/4 flex items-start">
            <Logo />
          </div>

          {/* CENTER: Company Address */}
          <div className="w-full lg:w-2/4 lg:px-8">
            <SectionTitle>{t("officeTitle")}</SectionTitle>
            <p className="mt-4 leading-relaxed">
              {t("addressLine1")}
              <br />
              {t("addressLine2")}
              <br />
              {t("addressLine3")}
            </p>
          </div>

          {/* RIGHT: Contact Information */}
          <div className="w-full lg:w-1/4">
            <SectionTitle>{t("contactTitle")}</SectionTitle>
            <div className="mt-4 flex flex-col gap-3">
              <FooterContact
                icon={<Phone size={18} />}
                label="+66 818349165"
                href="tel:+66818349165"
              />
              <FooterContact
                icon={<Phone size={18} />}
                label="+66 638242260"
                href="tel:+66638242260"
              />
              <FooterContact
                icon={<Mail size={18} />}
                label={t("emailLabel")}
                href={`mailto:${t("emailLabel")}`}
              />
              <FooterContact
                icon={<Mail size={18} />}
                label={t("emailLabel2")}
                href={`mailto:${t("emailLabel2")}`}
              />
              <FooterContact
                icon={<Facebook size={18} />}
                label="N.S. Service Thailand - Injection Molding Service Center"
                href={t("facebookLabel")}
                newTab
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Simple logo block; replace with your real logo if you have one */
function Logo() {
  return (
    <Image
      src={CompanyLogo}
      alt="Company logo"
      width={120}
      height={60}
      className="object-contain"
    />
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-white/70">
        {children}
      </div>
      <div className="mt-2 h-0.5 w-10 bg-white/60" />
    </div>
  );
}

function FooterContact({
  icon,
  label,
  href,
  newTab = false,
}: {
  icon: React.ReactNode;   // 👈 changed
  label: string;
  href?: string;
  newTab?: boolean;
}) {
  const content = (
    <>
      <span className="text-white">{icon}</span>
      <span>{label}</span>
    </>
  );

  if (!href) {
    return <div className="flex items-center gap-3">{content}</div>;
  }

  const isTelOrMail = href.startsWith("tel:") || href.startsWith("mailto:");

  if (newTab && !isTelOrMail) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 hover:text-white hover:underline"
      >
        {content}
      </a>
    );
  }

  if (isTelOrMail) {
    return (
      <a
        href={href}
        className="flex items-center gap-3 hover:text-white hover:underline"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="flex items-center gap-3 hover:text-white hover:underline"
    >
      {content}
    </Link>
  );
}
