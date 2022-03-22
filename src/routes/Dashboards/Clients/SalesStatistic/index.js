import React, { useEffect, useState } from 'react';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtAdvCardContent from '../../../../@coremat/CmtAdvCard/CmtAdvCardContent';
import CmtAdvCard from '../../../../@coremat/CmtAdvCard';
import makeStyles from '@material-ui/core/styles/makeStyles';
import StatisticList from './StatisticList';
import Box from '@material-ui/core/Box';
import SalesGauge from './SalesGauge';
import SalesAreaChart from './SalesAreaChart';
import { eCommerce } from '../../../../@fake-db';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import {  KeyboardDatePicker } from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Axios from 'axios';


const useStyles = makeStyles(theme => ({
  cardContentRoot: {
    position: 'relative',
  },
  subTitleRoot: {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
  salesGaugeRoot: {
    color: theme.palette.text.primary,
    '& text': {
      fill: theme.palette.text.primary,
    },
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(4),
  },
}));

const SalesStatistic = () => {
  const [date, set_date] = useState(30);
  const [datedefault, set_datedefault] = useState(new Date());

  const [date_from, set_date_from] = useState("");
  const [date_to, set_date_to] = useState("");
  const [clients, set_clients] = React.useState('');
  const [allclients, set_allclients] = React.useState([]);


   const loadallclients = () =>{
         Axios.get("http://localhost:3001/loadallclients")
         .then((response)=>{
          set_allclients(response.data);
         })
         .catch((err)=>{
           console.log(err);
         })
   }

  // const handleChange = event => {
  //   set_clients(event.target.value);
  // };
  const classes = useStyles();
  
  useEffect(() => {
    loadallclients();
  }, [])
  
  return (
    <CmtAdvCard>
      <Box>

<ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
        style={{ marginBottom: '15px' }}>
        <Button
          onClick={event => {
            set_date(365);
            set_date_to("");
            set_date_from("");
          }}>
          year
        </Button>
        <Button
          onClick={event => {
            set_date(30);
            set_date_to("");
            set_date_from("");
          }}>
          month
        </Button>
        <Button
          onClick={event => {
            set_date(7);
            set_date_to("");
            set_date_from("");
          }}>
          week
        </Button>

        <Button
          onClick={event => {
            set_date(1);
            set_date_to("");
            set_date_from("");
          }}>
          day
        </Button>

      </ButtonGroup>

      

      </Box>
      <Box>  
        <FormControl className={classes.formControl} style={{ justifyContent: 'right'}}>
          <Select
            value={clients}
            onChange={(event) =>{set_clients(event.target.value); console.log(clients)} }
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'Without label' }}>
            <MenuItem value=""><em>Clients</em></MenuItem>
            { allclients.map(item =>(
              <MenuItem key={item.id} value={item.id}>{item.nom}</MenuItem>
               ))}
            {/* <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
          <FormHelperText>List Tout les Clients</FormHelperText>
        </FormControl>
        </Box>
      





      <Grid container justifyContent="space-around">





     

        <KeyboardDatePicker
          placeholder="Date from"
          value={ (date_from === "") ? datedefault : date_from}
          onChange={(date) => { set_date_from(date) }}
          format="yyyy/MM/dd"
          maxDate={new Date()}

        />


  


        <KeyboardDatePicker
          placeholder="Date To"
          value={ (date_to === "") ? datedefault : date_to}
          onChange={(date) => { set_date_to(date)  }}
          format="yyyy/MM/dd"
          maxDate={new Date()}

        />




      </Grid>
      <CmtCardHeader title="Sales statistic" />
      <CmtAdvCardContent className={classes.cardContentRoot}>
        <Box mb={{ xs: 5, sm: 8, lg: 11 }}>
          <StatisticList    id={clients}  date={date} datefrom={date_from} dateto={date_to} />
        </Box>
        <GridContainer>
          <Grid item xs={12} lg={8}>
            <SalesAreaChart  id={clients}  date={date} datefrom={date_from} dateto={date_to} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box className={classes.salesGaugeRoot}>
              <SalesGauge  id={clients} date={date} datefrom={date_from} dateto={date_to} />
            </Box>
          </Grid>
        </GridContainer>
      </CmtAdvCardContent>
    </CmtAdvCard>
  );
};

export default SalesStatistic;
