import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Application from '@/components/application';
import { getLocale } from '@/utils/locale';
import { pullInitialProps } from '@/utils/store';

// #if IS_BROWSER
const container = document.getElementById('app');
const element = (
  <BrowserRouter>
    <Application locale={getLocale()} state={pullInitialProps('global')} />
  </BrowserRouter>
);

// #if SSR
hydrate(element, container);
// #else
render(element, container);
// #endif

// #else
export default Application;
// #endif
