import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export default function PageLayout({ children}: Props) {
  const t = useTranslations('PageLayout');

  return (
    <div>
      <div>
        <div />
      </div>
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
}
