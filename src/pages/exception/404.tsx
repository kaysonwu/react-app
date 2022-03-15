import React, { FC } from 'react';
import { Button, Result } from 'antd';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

const NotFound: FC = () => {
  const { replace } = useHistory();
  const { formatMessage } = useIntl();

  return (
    <>
      <Result
        extra={
          <Button type="primary" onClick={() => replace('/')}>
            {formatMessage({ id: 'Back home' })}
          </Button>
        }
        status="404"
        subTitle={formatMessage({ id: 'Sorry, the page you visited does not exist.' })}
        title={formatMessage({ id: 'Not Found' })}
      />
    </>
  );
};

export default NotFound;
