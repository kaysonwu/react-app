import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
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
loadableReady(() => {
  hydrate(element, container);
});
// #else
render(element, container);
// #endif

// #else
export default Application;
// #endif
