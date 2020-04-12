import React from 'react';
import { Link } from 'react-router-dom';
import Page from '@/components/page';

const User = () => {
  return (
    <Page>
      <div>This is user page!</div>
      <Link to="/">Go Home</Link>
    </Page>
  );
}

export default User;
