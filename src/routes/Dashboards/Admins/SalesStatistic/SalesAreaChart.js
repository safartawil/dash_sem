import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, CartesianGrid } from 'recharts';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import PropTypes from 'prop-types';
// ...



const SalesAreaChart = ({ id, date, datefrom, dateto }) => {
  const [data, set_data] = useState([]);
  const [CRBT, set_chekcrbt] = useState(true);
  const [FRAIS, set_chekfrais] = useState(true);
  const [LIVRE, set_cheklivre] = useState(true);
  const [RETOURN, set_chekretourn] = useState(true);
  const [REFUSE, set_chekrefuse] = useState(true);

  // SalesAreaChart.propTypes = {
  //   date: PropTypes.number,
  //   datefrom: PropTypes.instanceOf(Date),
  //   dateto: PropTypes.instanceOf(Date)

  // };


  const ClientCRBT_data = useCallback(() => {
    axios.post('http://localhost:3001/ClientCRBT_data', { id: id, date: date, datefrom: datefrom, dateto: dateto }).then((response) => {
      console.log('ClientCRBT_data');
      console.log(response.data);
      set_data(response.data);
    });
  }, [id, date, datefrom, dateto]);

  const CRBT_data = useCallback(() => {
    axios.post('http://localhost:3001/FilterdateCRBT', { id: id, date: date, datefrom: datefrom, dateto: dateto }).then((response) => {
      console.log('crbt date');
      console.log(response.data);
      set_data(response.data);
    });
  }, [date, datefrom, dateto]);

  useEffect(() => {

    if (id === "") {
      CRBT_data();

    }
    else {
      ClientCRBT_data();
    }


  }, [id, date, datefrom, dateto]);
  return (
    <>




      <FormControl component="fieldset">
        <RadioGroup row aria-label="position" name="position" defaultValue="top">
          <FormControlLabel value="CRBT" control={<Radio color="primary" checked={CRBT} onClick={(event) => { set_chekcrbt(!CRBT) }} />} label="CRBT" labelPlacement="start" />
          <FormControlLabel value="FRAIS" control={<Radio color="primary" checked={FRAIS} onClick={(event) => { set_chekfrais(!FRAIS) }} />} label="FRAIS" labelPlacement="start" />
          <FormControlLabel value="LIVRE" control={<Radio color="primary" checked={LIVRE} onClick={(event) => { set_cheklivre(!LIVRE) }} />} label="LIVRE" labelPlacement="start" />
          <FormControlLabel value="RETOURN" control={<Radio color="primary" checked={RETOURN} onClick={(event) => { set_chekretourn(!RETOURN) }} />} label="RETOURN" labelPlacement="start" />
          <FormControlLabel value="REFUSER" control={<Radio color="primary" checked={REFUSE} onClick={(event) => { set_chekrefuse(!REFUSE) }} />} label="REFUSER" labelPlacement="start" />

        </RadioGroup>
      </FormControl>
      <ResponsiveContainer width="100%" height={300}>

        <LineChart
          width={900}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="Filter" />

          <YAxis />
          <Tooltip />
          <Legend />

          {CRBT ? <Line type="monotone" dataKey="CRBT" stroke="#8884d8" /> : ''}

          {FRAIS ? <Line type="monotone" dataKey="FRAIS" stroke="#af6817" /> : ''}

          {LIVRE ? <Line type="monotone" dataKey="livré" stroke="#d92d2f" /> : ''}

          {RETOURN ? <Line type="monotone" dataKey="Retourner a lagence" stroke="#0a7c53" /> : ''}

          {REFUSE ? <Line type="monotone" dataKey="refuse" stroke="#18b0b6" /> : ''}



        </LineChart>
      </ResponsiveContainer>
    </>
  );

};
export default SalesAreaChart;
