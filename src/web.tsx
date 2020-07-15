import React from 'react';
import isMobile from 'is-mobile';
import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import Application from '@/components/application';
import { getLocale } from '@/utils/locale';

const container = document.getElementById('app');
const element = (
  <BrowserRouter>
    <Application isMobile={isMobile()} locale={getLocale()} />
  </BrowserRouter>
);

// #!if SSR
loadableReady(() => {
  hydrate(element, container);
});
// #!else
render(element, container);
// #!endif
