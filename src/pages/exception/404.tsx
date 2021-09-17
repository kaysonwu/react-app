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
        status="404"
        title={formatMessage({ id: 'Not Found' })}
        subTitle={formatMessage({ id: 'Sorry, the page you visited does not exist.' })}
        extra={
          <Button type="primary" onClick={() => replace('/')}>
            {formatMessage({ id: 'Back home' })}
          </Button>
        }
      />
    </>
  );
};

export default NotFound;
