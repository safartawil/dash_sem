import Axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtCard from '@coremat/CmtCard';
const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: 200,
    },
    tooltip: {
        position: 'relative',
        borderRadius: 6,
        padding: '4px 8px',
        backgroundColor: 'white',
        color: theme.palette.common.black,
    },
}));
function Factureintern(props) {

    const [data, setdata] = useState([])
    const classes = useStyles();

    const Facturinterndata = useCallback(() => {
        Axios.post("http://localhost:3001/Facturinterndata", { datefrom: props.datefrom, dateto: props.dateto })
            .then((response) => {

                setdata(response.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [props.datefrom, props.dateto])
    useEffect(() => {

        Facturinterndata()
    }, [props.datefrom, props.dateto])
    return (
        <CmtCard>
            <CmtCardHeader className="pt-4" title="Etats colis Livré" actionsPos="top-corner" />
            <ResponsiveContainer width="100%" height={300}  >
                <BarChart data={data} margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                    <XAxis dataKey="Nameday" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip labelStyle={{ color: 'black' }} itemStyle={{ color: 'black' }} cursor={false}
                        content={data => {
                            return data.payload[0] ? (
                                <div className={classes.tooltip}>
                                    <div>Date : {data.payload[0].payload.day} || {data.payload[0].payload.Nameday}</div>
                                    <div>Total : {data.payload[0].payload.Net + data.payload[0].payload.Refuse + data.payload[0].payload.Frais + data.payload[0].payload.Parrainage + data.payload[0].payload.Remis} DH</div>
                                    <div>Total Net : {data.payload[0].payload.Net} DH</div>
                                    <div>Total Frais : {data.payload[0].payload.Frais} DH</div>

                                    <div>Total Refuse: {data.payload[0].payload.Refuse} DH</div>
                                    <div>Total Remise: {data.payload[0].payload.Remis} DH</div>
                                    <div>Total parrainage: {data.payload[0].payload.Parrainage} DH</div>

                                </div>
                            ) : null;
                        }}
                    />
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
                            <stop offset="5%" stopColor="#E59D1E" stopOpacity={1} />
                            <stop offset="95%" stopColor="#E59D1E" stopOpacity={0.2} />
                        </linearGradient>
                    </defs>
                    <Bar dataKey="Frais" stackId="a" fill="url(#color1)" />
                    <Bar dataKey="Net" stackId="a" fill="url(#color2)" />
                    <Bar dataKey="Refuse" stackId="a" fill="url(#color3)" />
                </BarChart>
            </ResponsiveContainer>
        </CmtCard>
    )
}

export default Factureintern