import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import { Grid } from '@material-ui/core';
import SalesStatistic from './SalesStatistic';
import SimpleNotifications from './SimpleNotifications';
import MarketingCampaign from '../../Widgets/Classic/MarketingCampaign';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import Cart1 from './Cart1';
import Cart2 from './Cart2';
import Cart3 from './Cart3';
import Cart4 from './Cart4';
import Nombrecolis from './Nombrecolis';
import Bonlivraison from './Bonlivraisons';
import Facture from './Facture';
import Facturation from './Facturation';









const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Admins', isActive: true },
];

const ECommerceDashboard = () => {
  return (
    <PageContainer heading="ECommerce Dashboard" breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12} sm={6} md={3}>
          <Cart1 />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Cart2 />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Cart3 />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Cart4 />
        </Grid>
        <Grid item xs={12}>
          <SalesStatistic />
        </Grid>

        {/* //Nombrecolis */}
        <Grid item xs={12} xl={12}>

          <Nombrecolis></Nombrecolis>

        </Grid>

        {/* Eatat colis livré - factur intern */}
        <Grid item xs={12} xl={7}>
          <GridContainer>
            <Facturation></Facturation>
          </GridContainer>
        </Grid>

        {/* //Bonlivraison */}
        <Grid item xs={12} xl={7}>
          <GridContainer>
            <Bonlivraison></Bonlivraison>
          </GridContainer>
        </Grid>

        {/* demeande ramassage - relvé retourné */}
        <Grid item xs={12} xl={7}>
          <GridContainer>
            <Facture></Facture>
          </GridContainer>
        </Grid>







        <Grid item xs={12} md={6} xl={5}>
          <MarketingCampaign />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <SimpleNotifications />
        </Grid>

        {/* <Grid item xs={12} sm={6} xl={3}>
          <OrderAnalyticsSummary />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <OnlineTraffic />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <WebBrowsers />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <ApplicationsSummary />
        </Grid>
        <Grid item xs={12}>
          <SiteVisitors />
        </Grid> */}
      </GridContainer>
    </PageContainer>
  );
};

export default ECommerceDashboard;
