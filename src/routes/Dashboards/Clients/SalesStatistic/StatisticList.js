import React from 'react';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { useEffect, useState , useCallback} from 'react';
import {
  // Paid,
  Functions,
  LocalAtm,
  MoneyOff,
  MonetizationOn,
} from '@material-ui/icons';

const StatisticList = ({ id , date, datefrom, dateto }) => {

  const [dataval, set_dataval] = useState({});
  // const [datavalvlient, set_datavalvlient] = useState({});

  const Clientval = useCallback(() => {
    axios.post('http://localhost:3001/Clientval', { id:id ,  date: date, datefrom: datefrom, dateto: dateto }).then(response => {
      console.log(response.data);
      console.log("Clientval" + id);
      set_dataval({
        CRBT: response.data[0].CRBT, //crbt
        FRAIS: response.data[0].FRAIS, //frais
        Livre: response.data[0].Livre, // frais net livré
        Retourne: response.data[0]['Retourner a lagence'], // retourné
        NBcolis: response.data[0].NBcolis, //nbr colis
        refuse: response.data[0].refuse, //not found
      });
    });
  },[id , date, datefrom, dateto]);

  const Sumvalue = useCallback(() => {
    axios.post('http://localhost:3001/Sumvalue', { date: date, datefrom: datefrom, dateto: dateto }).then(response => {
      console.log(response.data);
      console.log("Sumvalue" + datefrom);
      set_dataval({
        CRBT: response.data[0].CRBT, //crbt
        FRAIS: response.data[0].FRAIS, //frais
        Livre: response.data[0].Livre, // frais net livré
        Retourne: response.data[0]['Retourner a lagence'], // retourné
        NBcolis: response.data[0].NBcolis, //nbr colis
        refuse: response.data[0].refuse, //not found
      });
    });
  },[id , date, datefrom, dateto]);
  useEffect(() => {
    if(id===""){
      Sumvalue();

    }
    else{
      Clientval();
    }
    
    
  }, [id , date, datefrom, dateto]);

  return (
    <GridContainer>


      <GridContainer>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <Box display="flex" alignItems="center" mb={2}>
            <Functions />
            <Box component="span" ml={3} fontSize={18} fontWeight="fontWeightBold">
              {dataval.NBcolis}
            </Box>
          </Box>
          <Box component="p" fontSize={16} color="text.secondary">
            Nombre Colis
          </Box>
        </Grid>

        <Grid item xs={6} sm={4} md={3} lg={2}>
          <Box display="flex" alignItems="center" mb={2}>
            <MonetizationOn />
            <Box component="span" ml={3} fontSize={18} fontWeight="fontWeightBold">
              {dataval.CRBT} DH
            </Box>
          </Box>
          <Box component="p" fontSize={16} color="text.secondary">
            CRBT
          </Box>
        </Grid>

        <Grid item xs={6} sm={4} md={3} lg={2}>
          <Box display="flex" alignItems="center" mb={2}>
            <MoneyOff />
            <Box component="span" ml={3} fontSize={18} fontWeight="fontWeightBold">
              {dataval.FRAIS} DH
            </Box>
          </Box>
          <Box component="p" fontSize={16} color="text.secondary">
            Frais
          </Box>
        </Grid>

        <Grid item xs={6} sm={4} md={3} lg={2}>
          <Box display="flex" alignItems="center" mb={2}>
            <LocalAtm />
            <Box component="span" ml={3} fontSize={18} fontWeight="fontWeightBold">
              {dataval.FRAIS} DH
            </Box>
          </Box>
          <Box component="p" fontSize={16} color="text.secondary">
            Commission
          </Box>
        </Grid>

        <Grid item xs={6} sm={4} md={3} lg={2}>
          <Box display="flex" alignItems="center" mb={2}>
            <MoneyOff />
            <Box component="span" ml={3} fontSize={18} fontWeight="fontWeightBold">
              {dataval.refuse} DH
            </Box>
          </Box>
          <Box component="p" fontSize={16} color="text.secondary">
            frais Refusé
          </Box>
        </Grid>

        <Grid item xs={6} sm={4} md={3} lg={2}>
          <Box display="flex" alignItems="center" mb={2}>
            <LocalAtm />
            <Box component="span" ml={3} fontSize={18} fontWeight="fontWeightBold">
              {dataval.Livre} DH
            </Box>
          </Box>
          <Box component="p" fontSize={16} color="text.secondary">
            Frais Net Livré
          </Box>
        </Grid>

        <Grid item xs={6} sm={4} md={3} lg={2}>
          <Box display="flex" alignItems="center" mb={2}>
            <MoneyOff />
            <Box component="span" ml={3} fontSize={18} fontWeight="fontWeightBold">
              {dataval.Retourne} DH
            </Box>
          </Box>
          <Box component="p" fontSize={16} color="text.secondary">
            Frais Retourné
          </Box>
        </Grid>
      </GridContainer>
    </GridContainer>
  );
};

export default StatisticList;
