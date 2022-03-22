import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CmtAdvCard from '../../../../@coremat/CmtAdvCard';
import CmtAdvCardContent from '../../../../@coremat/CmtAdvCard/CmtAdvCardContent';
import Box from '@material-ui/core/Box';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    advCard: {
        borderTop: props => `solid 4px ${props.color}`,
    },
    titleRoot: {
        marginBottom: 5,
        [theme.breakpoints.up('lg')]: {
            fontSize: 18,
        },
    },
    subTitleRoot: {
        fontSize: 16,
        color: theme.palette.common.black,
        letterSpacing: 0.15,
    },
    dots: {
        height: 8,
        width: 8,
        borderRadius: '50%',
        boxShadow: '0px 2px 4px rgba(68, 68, 79, 0.15)',
    },
    iconSm: {
        fontSize: 18,
    },
    root: {
        width: '100%',
        maxWidth: 500,
      },
}));

const StatisticsClassicCard = ({ title, subTitle, growth, color, labels, children, ...rest }) => {
    const classes = useStyles({ color });
    const [data, setdata] = useState(0);
    const [porcentage, set_porcentage] = useState(0);
    const CRBT_today = () => {
        axios
          .get('http://localhost:3001/cart1')
          .then(response => {
            setdata({
              CRBT :response.data[0].CRBT,
              Frais : response.data[0].FRAIS,
              Commision : response.data[0].Commission,
              NBcolis : response.data[0].NBcolis,
            
            });
            let calcul = parseFloat(
              ((response.data[0].CRBT - response.data[0].CRBT_lastday) * 100) /
                (response.data[0].CRBT + response.data[0].CRBT_lastday),
            ).toFixed(2);
            set_porcentage(calcul);
          })
          .catch(err => {
            console.log(err);
          });
      };
    
      useEffect(() => {
        CRBT_today();
      }, []);
    return (
        <CmtAdvCard className={classes.advCard} {...rest}>
            <CmtAdvCardContent alignCenter>
                {children}

                <Box display="flex" mt={2}>




                    <Box  >
                        <Typography component="div" variant="h1"  className={classes.titleRoot} style={{ color: color }}>
                            {data.CRBT} DH
                        </Typography>
                        <Box className={classes.subTitleRoot}>CRBT </Box>

                        <Typography component="div" variant="h1" className={classes.titleRoot} style={{ color: color }}>
                            {data.Commision} DH
                        </Typography>
                        <Box className={classes.subTitleRoot}>Commision  </Box>


                        
                    </Box>


                    <Box ml="auto">
                        <Box display="flex" alignItems="center" justifyContent="flex-end" color={porcentage > 0 ? 'green' : 'red'}>
                            <Box>{Math.abs(porcentage)}%</Box>
                            <Box ml={1}>
                                {porcentage > 0 ? (
                                    <TrendingUpIcon className={classes.iconSm} />
                                ) : (
                                    <TrendingDownIcon className={classes.iconSm} />
                                )}
                            </Box>
                            
                            
                        </Box>
                        <Box>
                       
                        <Typography component="div" variant="h1" className={classes.titleRoot} style={{ color: color }}>
                            {data.Frais}  DH
                        </Typography>
                        <Box className={classes.subTitleRoot}>Frais </Box>
                


                        <Typography component="div" variant="h1" className={classes.titleRoot} style={{ color: color }}>
                            {data.NBcolis}
                        </Typography>
                        <Box className={classes.subTitleRoot}>Nombre colis  </Box>
                    </Box>
                     
                    </Box>
                    {labels && labels.length > 0 && (
                            <Box mt={1} display="flex" alignItems="center" flexWrap="wrap" justifyContent="center">
                                {labels.map((item, index) => (
                                    <Box key={index} ml={2} mb={1} display="flex" alignItems="center">
                                        <Box
                                            mr={2}
                                            component="span"
                                            className={classes.dots}
                                            style={{
                                                backgroundColor: item.color,
                                            }}
                                        />
                                        <Box component="span" fontSize={12} color="common.dark">
                                            {item.name}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        )}
                </Box>
            </CmtAdvCardContent>
        </CmtAdvCard>
    );
};

export default StatisticsClassicCard;
