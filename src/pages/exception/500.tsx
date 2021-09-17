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
        status={500}
        title={formatMessage({ id: 'Internal Server Error' })}
        subTitle={formatMessage({ id: 'Sorry, the server is reporting an error.' })}
        extra={
          <Space>
            <Button onClick={() => replace('/')}>{formatMessage({ id: 'Back home' })}</Button>
            <Button type="primary" onClick={goBack}>
              {formatMessage({ id: 'Try again' })}
            </Button>
          </Space>
        }
      />
    </>
  );
};

export default InternalServerError;
