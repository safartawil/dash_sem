import React, { useEffect, useState ,useCallback } from 'react';
import axios from 'axios';
import { Chart } from "react-google-charts";
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtCard from '@coremat/CmtCard';




export const options = {

   is3D: true,
};
function Pieglobal(props) {
   let [Pieglobal, set_Pieglobal] = useState([]);

   const titer = "Nombre colis  par " + props.option + " " + props.choix + " ";

   const Data_Pieglobal = useCallback(() => {
      axios.post("http://localhost:3001/Data_Pieglobal", { option: props.option, date: props.date, choix: props.choix })
         .then((response) => {


            if (props.option === "Villes") {


               Pieglobal = [];
               Pieglobal.push(["VILLE", "NBcolis"]);
               for (let i = 0; i < response.data.length; i++) {

                  let table = [response.data[i].VILLE, response.data[i].NBcolis];
                  Pieglobal.push(table);

               }
               set_Pieglobal(Pieglobal);


            }

            else if (props.option === "Livreurs") {
               Pieglobal = [];
               Pieglobal.push(["LIVREUR", "NBcolis"]);
               for (let i = 0; i < response.data.length; i++) {

                  let table = [response.data[i].LIVREUR, response.data[i].NBcolis];
                  Pieglobal.push(table);

               }
               set_Pieglobal(Pieglobal);

            }
            else {
               Pieglobal = [];
               Pieglobal.push(["CLIENTS", "NBcolis"]);
               for (let i = 0; i < response.data.length; i++) {

                  let table = [response.data[i].CLIENTS, response.data[i].NBcolis];
                  Pieglobal.push(table);

               }
               set_Pieglobal(Pieglobal);
               console.log(response.data);

            }

         })

   },[props.option, props.date, props.choix])

   useEffect(() => {
      Data_Pieglobal();
   }, [props.option, props.date, props.choix])





   return (

      <CmtCard>
         <CmtCardHeader className="pt-4" title={titer} actionsPos="top-corner" />
         <Chart
            chartType="PieChart"
            data={Pieglobal}
            options={options}
            width={"100%"}
            height={"400px"}
         />
      </CmtCard>

   );
}

export default Pieglobal;
