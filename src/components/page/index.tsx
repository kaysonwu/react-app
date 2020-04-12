import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import Header from './header';
import Footer from './footer';
import menus from 'config/menus';
import './index.less';

const { Content } = Layout;

const Page = ({ user, dispatch, children, ...props }: any) => {

  useEffect(() => {
    if (!user) {
      dispatch({ type: 'global/fetchUser' });
    }
    
  }, [])

  return (
    <Layout>
      <Header user={user} menus={menus} theme="dark" />
      <Content>
        {children}
      </Content>
      <Footer 
        copyright={
          <>
            Copyright <CopyrightOutlined /> 2020 <a href="https://github.com/kaysonwu/react-app" target="_blank">React App</a> All Rights Reserved.
          </>
        } 
      />
    </Layout>
  )
}

export default connect((state: any) => ({
  user: state.global.user
}))(Page)
