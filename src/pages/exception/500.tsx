import React, { FC } from 'react';
import { Button, Result, Space } from 'antd';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

const InternalServerError: FC = () => {
  const { replace, goBack } = useHistory();
  const { formatMessage } = useIntl();

  return (
    <>
      <Result
        extra={
          <Space>
            <Button onClick={() => replace('/')}>{formatMessage({ id: 'Back home' })}</Button>
            <Button type="primary" onClick={goBack}>
              {formatMessage({ id: 'Try again' })}
            </Button>
          </Space>
        }
        status={500}
        subTitle={formatMessage({ id: 'Sorry, the server is reporting an error.' })}
        title={formatMessage({ id: 'Internal Server Error' })}
      />
    </>
  );
};

export default InternalServerError;
