import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter, withRouter, RouteComponentProps } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import Application, { ApplicationProps } from '@/components/application';
import Global from '@/models/global';
import { configureStore } from '@/utils/model';
import { getLocale } from '@/utils/locale';

type Props = ApplicationProps & RouteComponentProps;
const App = withRouter(Application as React.ComponentType<Props>);

const container = document.getElementById('app');
const element = (
  <BrowserRouter>
    <App store={configureStore([Global])} locale={getLocale()} />
  </BrowserRouter>
);

// #!if ssr
loadableReady(() => {
  hydrate(element, container);
});
// #!else
render(element, container);
// #!endif
