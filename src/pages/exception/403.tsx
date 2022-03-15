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
        extra={
          <Space>
            <Button onClick={goBack}>{formatMessage({ id: 'Go back' })}</Button>
            <Button type="primary" onClick={() => replace('/')}>
              {formatMessage({ id: 'Back home' })}
            </Button>
          </Space>
        }
        status="403"
        subTitle={formatMessage({ id: "Sorry, you don't have access to this page." })}
        title={formatMessage({ id: 'Forbidden' })}
      />
    </>
  );
};

export default Forbidden;
