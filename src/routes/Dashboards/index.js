import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';

const Dashboards = ({ match }) => {
  const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/admins`} />
        <Route path={`${requestedUrl}/admins`} component={lazy(() => import('./Admins'))} />
        <Route path={`${requestedUrl}/ECommerce`} component={lazy(() => import('./ECommerce'))} />
        <Route path={`${requestedUrl}/clients`} component={lazy(() => import('./Clients'))} />
        {/* <Route path={`${requestedUrl}/crm`} component={lazy(() => import('./Crm'))} />
        <Route path={`${requestedUrl}/intranet`} component={lazy(() => import('./Intranet'))} />
        <Route path={`${requestedUrl}/eCommerce`} component={lazy(() => import('./ECommerce'))} />
        <Route path={`${requestedUrl}/news`} component={lazy(() => import('./News'))} />
        <Route path={`${requestedUrl}/misc`} component={lazy(() => import('./Misc'))} /> */}
        <Route component={lazy(() => import('../ExtraPages/404'))} />
      </Switch>
    </Suspense>
  );
};

export default Dashboards;
