import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Page from '@/components/page';

const Home = (props: any) => {

  useEffect(() => {
    console.log('Home 挂载了!');
    return () => {
      console.log('Home 卸载了!');
    };
  })

  return (
    <Page>
      <div>This is home page!</div>
      <Link to="/user">Go User</Link>
    </Page>
  );
}

export default Home;
