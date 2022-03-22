import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import Etatcolislivre from './Etatcolislivre'
import { makeStyles } from '@material-ui/core/styles';

import { KeyboardDatePicker } from '@material-ui/pickers';
import Factureintern from './Factureintern';











function Facturation() {
  const [datefrom, set_datefrom] = useState("");
  const [dateto, set_dateto] = useState("");
  const [datedefault, set_datedefault] = useState(new Date());


  return (
    <>

      <Grid item xs={12} sm={8} md={9} lg={12}>
        <KeyboardDatePicker
          style={{ paddingrigh: 100 }}
          placeholder="Date from"
          value={(datefrom === "") ? datedefault : datefrom}
          onChange={(date) => { set_datefrom(date) }}
          format="yyyy/MM/dd"
          maxDate={new Date()}

        />

        <KeyboardDatePicker
          placeholder="Date To"
          value={(dateto === "") ? datedefault : dateto}
          onChange={(date) => { set_dateto(date) }}
          format="yyyy/MM/dd"
          maxDate={new Date()}
        />
      </Grid>


      <Grid item xs={12} sm={8} md={9} lg={6}>
        <Etatcolislivre datefrom={datefrom} dateto={dateto}></Etatcolislivre>
      </Grid>

      <Grid item xs={12} sm={8} md={9} lg={6}>
        <Factureintern datefrom={datefrom} dateto={dateto}></Factureintern>
      </Grid>










    </>
  )
}

export default Facturation