import React, { useEffect, useState , useRef  } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5radar from '@amcharts/amcharts5/radar';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(6),
  },
}));



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SalesGauge = ({ id , date ,  datefrom, dateto}) => {


  let [data, set_datanbcolis] = useState([]);
  const [allstatu, set_allstatu] = useState([]);

  const classes = useStyles();

  const [selectstatu, setselectstatu] = React.useState([]);
  const [selecttext, setselecttext] = useState([]);

  

  const handleChange = event => {

    setselectstatu(event.target.value);

    // setselecttext(event.target.current.options[event.target.current.selectedIndex].text);
    // console.log(selecttext);
    

  };

  // const textselect = event => {
  //   setselecttext(event.target.value);
  // };

  // const handleChangeMultiple = event => {
  //   const { options } = event.target;
  //   const value = [];
  //   for (let i = 0, l = options.length; i < l; i += 1) {
  //     if (options[i].selected) {
  //       value.push(options[i].value);
  //     }
  //   }
  //   setselectstatu(value);
  // };

  const loadotherstatus =()=>{
    axios.get("http://localhost:3001/loadotherstatus")
    .then((response)=>{
      set_allstatu(response.data);
      console.log(response.data )
    })
  }



  useEffect(() => {
    loadotherstatus();
    
    let root = am5.Root.new('chartdiv');

    axios
      .post('http://localhost:3001/SimpleRadialBarChart',{ id:id , date:date , datefrom:datefrom , dateto:dateto , selectstatu : selectstatu })

      .then(response => {
       
   
    
        let chart = root.container.children.push(
          am5radar.RadarChart.new(root, {
            panX: false,
            panY: false,
            wheelX: 'panX',
            wheelY: 'zoomX',
            innerRadius: am5.percent(20),
            startAngle: -90,
            endAngle: 180,
          }),
        );

        root.setThemes([am5themes_Animated.new(root)]);
              if(selectstatu.length > 0)
              { 
                data=[];
                 let color = 0;
                 

             
                for(let i=0 ; i<selectstatu.length ; i++)
                {      
                  
                  


                  for(let j=0 ; j<response.data.length ; j++)
                  {

                      if(selectstatu[i]===response.data[j].status_id)
                      {
                        data.push({
                        category : response.data[j].nameStatus,
                        Count : response.data[j].NBstatu,
                        value : (response.data[j].NBstatu /  response.data[j].NBtotal)*100,
                        full: 100,
                        columnSettings: { fill: chart.get("colors").getIndex(color) }
                      

                         });
                      }
                      
                      

                    

                  }
                  color = color + 1 ;

                
                  
               }
                   
                    data.push({
                    category : 'NBcolis',
                    Count : response.data[0].NBtotal,
                    value : (response.data[0].NBtotal /  response.data[0].NBtotal)*100,
                    full: 100,
                    columnSettings: {fill: chart.get("colors").getIndex(4)}
                  
  
                     });

           
               
              }
              else {

                data=[

                  {
                    category : "Expedie",
                    Count : response.data[0].Count_Expedie,
                    value : response.data[0].Expedie,
                    full: 100,
                    columnSettings: { fill: chart.get("colors").getIndex(0) }
                      

                  },
                   {
                          category : "Retourner a lagence",
                          Count : response.data[0].Count_retourn,
                          value : response.data[0]["Retourner a lagence"],
                          full: 100,

                          columnSettings: { fill: "#d92d2f"}

                    }  , 

                     {
                      category : "Livre",
                      Count : response.data[0].Count_livre,
                      value : response.data[0].Livre,
                      full: 100,
                      columnSettings: { fill: "#0a7c53" }
                        

                    } ,
                    {
                      category : "Other status",
                      Count : response.data[0].Count_other,
                      value : response.data[0]["Other Status"],
                      full: 100,
                      columnSettings: { fill: chart.get("colors").getIndex(3) }
                        

                    },
                    {
                        
                      category : "NBcolis",
                      Count : response.data[0].count,
                      value : response.data[0].NBcolis,
                      full: 100,
                      columnSettings: {fill: chart.get("colors").getIndex(4)}

                    }
                  ];

              }
                




        let cursor = chart.set(
          'cursor',
          am5radar.RadarCursor.new(root, {
            behavior: 'zoomX',
          }),
        );

        cursor.lineY.set('visible', false);

        let xRenderer = am5radar.AxisRendererCircular.new(root, {
          //minGridDistance: 50
        });

        xRenderer.labels.template.setAll({
          radius: 10,
        });

        xRenderer.grid.template.setAll({
          forceHidden: true,
        });

        let xAxis = chart.xAxes.push(
          am5xy.ValueAxis.new(root, {
            renderer: xRenderer,
            min: 0,
            max: 100,
            strictMinMax: true,
            numberFormat: "#'%'",
            tooltip: am5.Tooltip.new(root, {}),
          }),
        );

        let yRenderer = am5radar.AxisRendererRadial.new(root, {
          minGridDistance: 20,
        });

        yRenderer.labels.template.setAll({
          centerX: am5.p100,
          fontWeight: '500',
          fontSize: 18,
          templateField: 'fill',
        });

        yRenderer.grid.template.setAll({
          forceHidden: true,
        });

        let yAxis = chart.yAxes.push(
          am5xy.CategoryAxis.new(root, {
            categoryField: 'category',
            renderer: yRenderer,
          }),
        );

        yAxis.data.setAll(data);

        // Create series
        // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
        let series1 = chart.series.push(
          am5radar.RadarColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            clustered: false,
            valueXField: 'full',
            categoryYField: 'category',
            fill: root.interfaceColors.get('alternativeBackground'),
          }),
        );

        series1.columns.template.setAll({
          width: am5.p100,
          fillOpacity: 0.08,
          strokeOpacity: 0,
          cornerRadius: 20,
        });

        series1.data.setAll(data);

        let series2 = chart.series.push(
          am5radar.RadarColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            clustered: false,
            valueXField: 'value',
            categoryYField: 'category',
          }),
        );

        series2.columns.template.setAll({
          width: am5.p100,
          strokeOpacity: 0,
          tooltipText: "{category}: {Count} Colis || {valueX}%",
          cornerRadius: 20,
          templateField: 'columnSettings',
        });

        series2.data.setAll(data);
        series1.appear(1000);
        series2.appear(1000);
        chart.appear(1000, 100);
        console.log('datadsdsnbscossssssssdfdlssis data');
        console.log(data);
      });

       console.log(selectstatu);
       return () => root.dispose();



  }, [id , date , datefrom , dateto , selectstatu]);

  return (
    <div>

        <div id="chartdiv" style={{ width: '100%', height: '300px' }} />

  


   <FormControl className={classes.formControl}>
        <InputLabel id="demo-multiple-checkbox-label">Status</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectstatu}
          onChange={handleChange}
          input={<Input />}
          renderValue={selected => selected.join(',')}
          MenuProps={MenuProps}>
          {allstatu.map(item => (
            <MenuItem   key={item.id} value={item.id}>
              <Checkbox checked={selectstatu.indexOf(item.id) > -1} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>

  
  );
};

export default SalesGauge;
