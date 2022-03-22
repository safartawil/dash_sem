import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import axios from 'axios';
import React, { useEffect, useState , useCallback } from 'react';
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';






export const options = {
  chart: {
    title: "Nombre colis par status",
  },
};


function Piestatus(props) {
  let [Piestatus, set_Piestatus] = useState([]);
  const titer = "Nomber colis par status " + props.choix + " ";


  const Data_Piestatus = useCallback(() => {
    axios.post("http://localhost:3001/Data_Piestatus", { option: props.option, date: props.date, choix: props.choix })
      .then((response) => {
        console.log("Data_Piestatus");
        console.log(response.data);

        set_Piestatus(response.data);


      })

  },[props.option, props.date, props.choix]);

  useEffect(() => {
    Data_Piestatus();
  }, [props.option, props.date, props.choix])


  return (<div>


    <CmtCard>
      <CmtCardHeader className="pt-4" title={titer} actionsPos="top-corner" />


      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={Piestatus} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip labelStyle={{ color: 'black' }} itemStyle={{ color: 'black' }} cursor={false} />
          <Legend />
          <defs>
            <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6200EE" stopOpacity={1} />
              <stop offset="95%" stopColor="#B819D2" stopOpacity={1} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1ABBDE" stopOpacity={1} />
              <stop offset="95%" stopColor="#09BCA7" stopOpacity={1} />
            </linearGradient>
          </defs>

          <defs>
            <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fc4a1a" stopOpacity={1} />
              <stop offset="95%" stopColor="#f7b733" stopOpacity={1} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="color4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#108dc7" stopOpacity={1} />
              <stop offset="95%" stopColor="#ef8e38" stopOpacity={1} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="color5" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FC5C7D" stopOpacity={1} />
              <stop offset="95%" stopColor="#6A82FB" stopOpacity={1} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="color6" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#CAC531" stopOpacity={1} />
              <stop offset="95%" stopColor="#F3F9A7" stopOpacity={1} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="color7" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#800080" stopOpacity={1} />
              <stop offset="95%" stopColor="#ffc0cb" stopOpacity={1} />
            </linearGradient>
          </defs>

          <Bar dataKey="expedie" fill="url(#color1)" />
          <Bar dataKey="Reception" fill="url(#color2)" />
          <Bar dataKey="Reporte" fill="url(#color3)" />
          <Bar dataKey="Ramasse" fill="url(#color4)" />
          <Bar dataKey="Livre" fill="url(#color5)" />
          <Bar dataKey="Retourner a lagence" fill="url(#color6)" />
          <Bar dataKey="Pas de reponse" fill="url(#color7)" />
        </BarChart>
      </ResponsiveContainer>

    </CmtCard>



  </div>);
}

export default Piestatus;
