import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Result, Space, Button } from 'antd';

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
            <Button onClick={goBack}>{formatMessage({ id: 'Go Back' })}</Button>
            <Button type="primary" onClick={() => replace('/')}>
              {formatMessage({ id: 'Back Home' })}
            </Button>
          </Space>
        }
      />
    </>
  );
};

export default Forbidden;
