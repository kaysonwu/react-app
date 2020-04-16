import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import Application from '@/components/application';
import Global from '@/models/global';
import { configureStore } from '@/utils/model';
import { getLocale } from '@/utils/locale';

const container = document.getElementById('app');
const element = (
  <BrowserRouter>
    <Application store={configureStore([Global])} locale={getLocale()} />
  </BrowserRouter>
);

// #!if ssr
loadableReady(() => {
  hydrate(element, container);
});
// #!else
render(element, container);
// #!endif
