import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from "react-google-charts";
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
export const options = {
   
    is3D: true,
  };


function Relve_retourne(props) {
    let  [data, setdata] = useState([]);

    const chartrelve_retourne = ()=>{
        axios.post("http://localhost:3001/chartrelve_retourne",{date:props.date , option:props.option , choix:props.choix})
        .then((response)=>{
              console.log(response.data);
               data=[];
               data.push(["Filter", "Nombre colis"]);
            for(let i=0 ; i<response.data.length ; i++)
             { 
                
                let table = [ (response.data[i].Filter === null) ? "err" : (response.data[i].Filter).toString() , response.data[i].count ];      
                data.push(table);
             
             }
             setdata(data);
        })
    }

    useEffect(() => {
     
        chartrelve_retourne();
     
    }, [props.date , props.option , props.choix])
  return (
    <CmtCard>

    <CmtCardHeader className="pt-4"  title="Relevé Retourné" actionsPos="top-corner" />
    
           <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
         /> 
    </CmtCard>
  )
}

export default Relve_retourne