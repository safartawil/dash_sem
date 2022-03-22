import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import CmtBackDrop from '../../../../@coremat/CmtBackDrop';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Box from '@material-ui/core/Box';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtImage from '../../../../@coremat/CmtImage';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Piestatus from '../Nombrecolis/Piestatus';
import Pieglobal from '../Nombrecolis/Pieglobal';
import PieVille from '../Nombrecolis/PieVille';
import { Grid } from '@material-ui/core';





const useStyles = makeStyles(theme => ({
  headerItem: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    [theme.breakpoints.down('xs')]: {
      fontSize: 13,
      paddingLeft: 8,
      paddingRight: 8,
    },
    color: alpha(theme.palette.common.white, 0.74),
    '&:not(:first-child)': {
      borderLeft: `1px solid ${alpha(theme.palette.common.white, 0.8)}`,
    },
    '& .MuiSvgIcon-root': {
      marginRight: 12,
    },
  },
  backdropContent: {
    color: alpha(theme.palette.common.white, 0.74),
    '& .form-control': {
      marginBottom: 20,
      '& label, & .MuiInput-formControl, & .MuiSelect-icon, & .MuiIconButton-root, & .MuiSvgIcon-root, & .MuiSelect-icon': {
        color: alpha(theme.palette.common.white, 0.74),
      },
      '& .MuiInput-underline:before, & .MuiInput-underline:after, & .MuiInput-underline:hover, & .(.Mui-disabled):before': {
        borderBottomColor: alpha(theme.palette.common.white, 0.74),
      },
    },
  },

  formControl: {
    color: alpha(theme.palette.common.white, 0.74),
    '& .form-control': {
      marginBottom: 20,
      '& label, & .MuiInput-formControl, & .MuiSelect-icon, & .MuiIconButton-root, & .MuiInput-underline, &  .MuiSvgIcon-root, & .MuiSelect-icon': {
        color: alpha(theme.palette.common.white, 0.74),
      },
      '& .MuiInput-underline:before, & .MuiInput-underline:after, & .MuiInput-underline:before, & .MuiInput-underline:hover, & .(.Mui-disabled):before': {
        borderBottomColor: alpha(theme.palette.common.white, 0.74),
      },
      '& .MuiSelect-icon': {
        marginRight: 12,
        color: alpha(theme.palette.common.white, 0.74),
      },
    },
  },
}));



const ProjectHeader = ({ date }) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" mx={{ xs: -2, sm: -4 }}>
      <Box className={classes.headerItem}>
        <DashboardIcon />
        Nombre Colis

      </Box>
      <Box className={classes.headerItem}>
        <CalendarTodayIcon />
            les  derniers {date} jours

      </Box>
    </Box>
  );
};

const ProjectWorkedHours = () => {
  const [revealed, setRevealed] = useState(false);
  const [date, set_date] = useState(3560);
  const [option, set_option] = useState("Clients");
  const [load_select, set_load_select] = useState([]);
  const [choix, set_choix] = useState("vide");

  const Project = () => {
 
    const classes = useStyles();


    return (
      <CmtCardContent>
        <Box className={classes.backdropContent}>
          <FormControl className={classes.formControl.formControl} style={{ width: "100%" }}>

            <Select className={classes.formControl}  onChange={(event) => { set_date(event.target.value); }} value={date} style={{  borderBottomColor:"2px solid rgba(255, 255, 255, 0.74)"}}>
              <MenuItem value="3560" >Date</MenuItem>
              <MenuItem value="365" >Dernier anné</MenuItem>
              <MenuItem value="30" >Dernier mois</MenuItem>
              <MenuItem value="7" >Dernier semain</MenuItem>
              <MenuItem value="1" >Dernier Jour</MenuItem>


            </Select>
          </FormControl>

          <FormControl className={classes.formControl} style={{ width: "100%" }}>

            <Select className={classes.formControl}  onChange={(event) => { set_option(event.target.value); }} value={option} >
              <MenuItem value="Clients" >Clients</MenuItem>
              <MenuItem value="Livreurs" >Livreurs</MenuItem>
              <MenuItem value="Villes" >Villes</MenuItem>


            </Select>
          </FormControl>


          <FormControl className={classes.formControl} style={{ width: "100%" }}>

            <Select className={classes.formControl}  labelId="demo-simple-select-label" id="demo-simple-select" onChange={(event) => { set_choix(event.target.value); }} value={choix} >



              <MenuItem value="vide">choix</MenuItem>


              {load_select.map((item) => (
                <MenuItem key={item.value} value={item.value} >{item.name}</MenuItem>

              ))}

            </Select>
          </FormControl>
        </Box>
      </CmtCardContent>
    );
  };

  const handleOnRevealed = status => {
    setRevealed(false);
  };
  const loadselect = useCallback(() => {
    axios.post("http://localhost:3001/loadselect", { option: option, date: date })
      .then((response) => {

        set_load_select(response.data)
      })
  }, [option, date]);



  useEffect(() => {
    loadselect();
  }, [option, date])
  return (
    <CmtBackDrop
      concealedIcon={<CmtImage src={'/images/icons/filter_icon.png'} alt="filter" />}
      backLayerConcealed={
        revealed ? '' : <ProjectHeader  date={date}    />
      }
      backLayerRevealed={
        <Project />
      }
      onRevealed={handleOnRevealed}>
    

      <Box style={{ width: "100%", display: "flex" }}>

        <Grid item xs={12} sm={8} md={9} lg={4}>
          <Pieglobal date={date} option={option} choix={choix}></Pieglobal>
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={4}>

          <Piestatus date={date} option={option} choix={choix}></Piestatus>
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={4}>
          <PieVille date={date} option={option} choix={choix}>  </PieVille>
        </Grid>
      </Box>



    </CmtBackDrop>
  );
};

export default ProjectWorkedHours;
