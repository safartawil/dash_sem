import axios from 'axios';
import React, { useEffect, useState , useCallback } from 'react';
import { Chart } from "react-google-charts";
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
export const options = {

   is3D: true,
};
function PieVille(props) {

   let [Pieville, set_Pieville] = useState([]);
   let [titer, settiter] = useState("")


   const Data_Pieville = () => {
      axios.post("http://localhost:3001/Data_Pieville", { option: props.option, date: props.date, choix: props.choix })
         .then((response) => {
            console.log("Data_Pieville");
            console.log(response.data);

            if (props.option === "Villes") {

               settiter("Nombre colis  par Clients " + props.choix);
               Pieville = [];
               Pieville.push(["CLIENTS", "NBcolis"]);
               for (let i = 0; i < response.data.length; i++) {

                  let table = [response.data[i].CLIENTS, response.data[i].NBcolis];
                  Pieville.push(table);

               }
               set_Pieville(Pieville);
               console.log(Pieville);


            }

            else if (props.option === "Livreurs") {
               settiter("Nombre colis  par ville " + props.choix);

               Pieville = [];
               Pieville.push(["VILLE", "NBcolis"]);
               for (let i = 0; i < response.data.length; i++) {

                  let table = [response.data[i].VILLE, response.data[i].NBcolis];
                  Pieville.push(table);

               }
               set_Pieville(Pieville);
               console.log(Pieville);

            }

            else if (props.option === "Clients") {
               settiter("Nombre colis  par ville " + props.choix);

               Pieville = [];
               Pieville.push(["VILLE", "NBcolis",]);
               for (let i = 0; i < response.data.length; i++) {

                  let table = [response.data[i].VILLE, response.data[i].NBcolis];
                  Pieville.push(table);

               }
               set_Pieville(Pieville);
               console.log(Pieville);

            }

            else {

               Pieville = [];
               Pieville.push(["VILLE", "NBcolis"]);
               for (let i = 0; i < response.data.length; i++) {

                  let table = [response.data[i].VILLE, response.data[i].NBcolis];
                  Pieville.push(table);

               }
               set_Pieville(Pieville);
               console.log(Pieville);

            }



         })

   }

   useEffect(() => {
      Data_Pieville();
   }, [props.option, props.date, props.choix])








   return (

      <CmtCard>

         <CmtCardHeader className="pt-4" title={titer} actionsPos="top-corner" />

         <Chart
            chartType="PieChart"
            data={Pieville}
            options={options}
            width={"100%"}
            height={"400px"}
         />
      </CmtCard>



   );
}

export default PieVille;
