import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import { Box , Grid } from '@material-ui/core';
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
import { metrics } from '../../../@fake-db';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CounterCard from '@jumbo/components/Common/CounterCard';
import CmtImage from '@coremat/CmtImage';











const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Clients', isActive: true },
];
const useStyles = makeStyles(() => ({
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid',
    borderRadius: '50%',
    height: 66,
    minWidth: 66,
    width: 66,
  },
}));

const ClientsDashboard = () => {
  const classes = useStyles();

  const {
    eCommerceData,
    dataMetrics,
    orders,
    activeUsers,
    extraRevenue,
    trafficRaise,
    revenueGrowth,
    trafficData,
  } = metrics;
  return (
    <PageContainer heading="ECommerce Dashboard" breadcrumbs={breadcrumbs}>
      <GridContainer>
      
      {eCommerceData.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <CounterCard
              icon={
                <Box className={classes.iconWrapper} style={{ borderColor: item.color + '88' }}>
                  <CmtImage src={item.imageIcon} alt="..." />
                </Box>
              }
              number={item.title}
              numberProps={{
                color: 'text.primary',
                fontSize: { xs: 20, xl: 22 },
                fontWeight: 'bold',
              }}
              label={item.subTitle}
              labelProps={{
                color: 'text.secondary',
                fontSize: 12,
                fontWeight: 'normal',
              }}
            />
          </Grid>
        ))}



        <Grid item xs={12}>
          <SalesStatistic />
        </Grid>

        {/* //Nombrecolis */}
        <Grid item xs={12} xl={12}>
          
            <Nombrecolis></Nombrecolis>
          
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


         {/* demeande ramassage - relvé retourné */}
         <Grid item xs={12} xl={7}>
          <GridContainer>
            <Facturation></Facturation>
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

export default ClientsDashboard;
