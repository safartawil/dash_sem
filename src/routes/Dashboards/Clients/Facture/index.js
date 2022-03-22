import { Box, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import Demanderamassage from './Demanderamassage'
import Relve_retourne from './Relve_retourne'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';






const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 200,
  },
}));

function Facture() {
  const [date, set_date] = useState(3560)
  const classes = useStyles();
  const [option, set_option] = useState("Clients");
  const [load_select, set_load_select] = useState([]);
  const [choix, set_choix] = useState("vide");



  const loadselect = () => {
    axios.post("http://localhost:3001/loadselect", { option: option, date: date })
      .then((response) => {

        set_load_select(response.data)
      })
  }

  useEffect(() => {
    loadselect();
  }, [option, date])
  return (
    <>



      <Grid item xs={12} sm={8} md={9} lg={12}>
        <FormControl className={classes.formControl} style={{ paddingLeft: 30 }}>

          <Select labelId="demo-simple-select-label" id="demo-simple-select" onChange={(event) => { set_date(event.target.value); }} value={date}>
            <MenuItem value="3560" >Date</MenuItem>
            <MenuItem value="365" >Dernier anné</MenuItem>
            <MenuItem value="30" >Dernier mois</MenuItem>
            <MenuItem value="7" >Dernier semain</MenuItem>
            <MenuItem value="1" >Dernier Jour</MenuItem>
          </Select>
        </FormControl>


        <FormControl className={classes.formControl} style={{ paddingLeft: 30 }}>

          <Select labelId="demo-simple-select-label" id="demo-simple-select" onChange={(event) => { set_option(event.target.value); }} value={option} >
            <MenuItem value="Clients" >Clients</MenuItem>
            <MenuItem value="Livreurs" >Livreurs</MenuItem>
            <MenuItem value="Villes" >Villes</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl} style={{ paddingLeft: 30 }}>

          <Select labelId="demo-simple-select-label" id="demo-simple-select" onChange={(event) => { set_choix(event.target.value); }} value={choix} >
            <MenuItem value="vide">choix</MenuItem>
            {load_select.map((item) => (
              <MenuItem key={item.value} value={item.value} >{item.name}</MenuItem>))}
          </Select>
        </FormControl>
      </Grid>






      <Grid item xs={12} sm={8} md={9} lg={6}>
        <Demanderamassage date={date} option={option} choix={choix}>  </Demanderamassage>
      </Grid>
      <Grid item xs={12} sm={8} md={9} lg={6}>
        <Relve_retourne date={date} option={option} choix={choix}> </Relve_retourne>
      </Grid>




    </>
  )
}

export default Facture