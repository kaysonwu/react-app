import React, { FC } from 'react';
import { Button, Result, Space } from 'antd';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

const Forbidden: FC = () => {
  const { goBack, replace } = useHistory();
  const { formatMessage } = useIntl();

  return (
    <>
      <Result
        status="403"
        title={formatMessage({ id: 'Forbidden' })}
        subTitle={formatMessage({ id: "Sorry, you don't have access to this page." })}
        extra={
          <Space>
            <Button onClick={goBack}>{formatMessage({ id: 'Go back' })}</Button>
            <Button type="primary" onClick={() => replace('/')}>
              {formatMessage({ id: 'Back home' })}
            </Button>
          </Space>
        }
      />
    </>
  );
};

export default Forbidden;
