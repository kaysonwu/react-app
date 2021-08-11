import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Result, Space, Button } from 'antd';

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
            <Button onClick={() => replace('/')}>{formatMessage({ id: 'Back Home' })}</Button>
            <Button type="primary" onClick={goBack}>
              {formatMessage({ id: 'Try Again' })}
            </Button>
          </Space>
        }
      />
    </>
  );
};

export default InternalServerError;
