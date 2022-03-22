import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from "react-google-charts";
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
export const options = {
   
    is3D: true,
  };

function Bonlivraisonretourne(props) {
    let  [data, setdata] = useState([]);
   


    const chartbonlivraisonretourne = ()=>{
        axios.post("http://localhost:3001/chartbonlivraisonretourne",{date:props.date , option:props.option , choix:props.choix})
        .then((response)=>{
              console.log(response.data);
               data=[];
               data.push(["livreur", "Nombre Bonlivraison"]);
            for(let i=0 ; i<response.data.length ; i++)
             { 
                
                let table = [response.data[i].name , response.data[i].NBbon_livraison ];      
                data.push(table);
             
             }
             setdata(data);
        })
    }

    useEffect(() => {
     
        chartbonlivraisonretourne();
     
    }, [props.date , props.option , props.choix])
  return (
    <CmtCard>

    <CmtCardHeader className="pt-4"  title="Bon de livraison retourné" actionsPos="top-corner" />
    
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

export default Bonlivraisonretourne