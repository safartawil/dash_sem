import { Grid } from '@material-ui/core'
import Etatcolislivre from './Etatcolislivre'
import React, { useState } from 'react';
import CmtBackDrop from '../../../../@coremat/CmtBackDrop';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Box from '@material-ui/core/Box';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtImage from '../../../../@coremat/CmtImage';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Factureintern from './Factureintern';
import { getFormattedDate } from '@jumbo/utils/dateHelper';
import AppDatePicker from '@jumbo/components/Common/formElements/AppDatePicker';








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
      '& label, & .MuiInput-formControl, & .MuiSelect-icon, & .MuiIconButton-root': {
        color: alpha(theme.palette.common.white, 0.74),
      },
      '& .MuiInput-underline:before, & .MuiInput-underline:after': {
        borderBottomColor: alpha(theme.palette.common.white, 0.74),
      },
    },
  },
}));



const ProjectHeader = ({ startDate, endDate }) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" mx={{ xs: -2, sm: -4 }}>
      <Box className={classes.headerItem}>
        <DashboardIcon />
        Nombre Colis

      </Box>
      <Box className={classes.headerItem}>
        <CalendarTodayIcon />
        {getFormattedDate(startDate, ' DD MMM YYYY')} - {getFormattedDate(endDate, ' DD MMM YYYY')}
      </Box>
    </Box>
  );
};

function Facturation() {
  const [datefrom, set_datefrom] = useState("");
  const [dateto, set_dateto] = useState("");
  const [datedefault, set_datedefault] = useState(new Date());
  const [revealed, setRevealed] = useState(false);


  const Project = () => {

    const classes = useStyles();


    return (
      <CmtCardContent>
        <Box className={classes.backdropContent}>

          <AppDatePicker label="Date From"
            value={(datefrom === "") ? datedefault : datefrom}
            onChange={(date) => { set_datefrom(date) }}
            format="yyyy/MM/dd"

            maxDate={new Date()}

          />
          <AppDatePicker label="Date To"
            value={(dateto === "") ? datedefault : dateto}
            onChange={(date) => { set_dateto(date) }}
            format="yyyy/MM/dd"

            maxDate={new Date()}

          />

        </Box>
      </CmtCardContent>
    );
  };

  const handleOnRevealed = status => {
    setRevealed(false);
  };


  return (
    <Grid item xs={12} sm={8} md={9} lg={12}>
      <CmtBackDrop
        concealedIcon={<CmtImage src={'/images/icons/filter_icon.png'} alt="filter" />}
        backLayerConcealed={
          revealed ? '' : <ProjectHeader startDate={datefrom} endDate={dateto} />
        }
        backLayerRevealed={
          <Project />
        }
        onRevealed={handleOnRevealed}>
        <Box style={{ width: "100%", display: "flex" }}>

          <Grid item xs={12} sm={8} md={9} lg={6}>
            <Factureintern datefrom={datefrom} dateto={dateto}></Factureintern>

          </Grid>

          <Grid item xs={12} sm={8} md={9} lg={6}>
            <Etatcolislivre datefrom={datefrom} dateto={dateto}></Etatcolislivre>
          </Grid>
        </Box>

      </CmtBackDrop>
    </Grid>
  )
}

export default Facturation