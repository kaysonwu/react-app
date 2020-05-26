import React, { MouseEvent, ReactNode } from 'react';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import TransButton from 'antd/lib/_util/transButton';

const renderBack = (
  prefixCls: string,
  direction?: 'ltr' | 'rtl',
  backIcon?: ReactNode,
  onBack?: (e?: MouseEvent<HTMLDivElement>) => void,
) => {
  if (!onBack) return null;
  let icon: ReactNode | undefined = backIcon;

  if (icon === undefined) {
    icon = direction === 'rtl' ? <ArrowRightOutlined /> : <ArrowLeftOutlined />;
  }

  return (
    <LocaleReceiver componentName="PageHeader">
      {locale => (
        <div className={`${prefixCls}-back`}>
          <TransButton
            onClick={onBack}
            className={`${prefixCls}-back-button`}
            aria-label={(locale as { back: string }).back}
          >
            {backIcon}
          </TransButton>
        </div>
      )}
    </LocaleReceiver>
  );
};

export default renderBack;
