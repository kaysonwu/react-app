import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Result, Button } from 'antd';

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
