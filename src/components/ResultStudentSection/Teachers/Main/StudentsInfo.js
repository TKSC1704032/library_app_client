import { Card, CardActionArea, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bg from '../../../Images/1stb.jfif';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {
        maxWidth: 345,
        margin: 'auto',
        background:'transparent',
        boxShadow: '5px 25px 25px '
    },
    media: {
        height: 140,
    },
    grid: {
        height: '100%',
        alignItems: 'center',
        backgroundImage:`url(${bg})`
    }
}));
const StudentsInfo = () => {
    const { series } = useParams()
    const [results, setResults] = useState([])
    useEffect(() => {
            fetch('http://localhost:5000/students/')
                .then(res => res.json()
                    .then(data => {
                        console.log(data)
                        setResults(data)
                    }))
        
    }, [])
    const findRes = results.filter(data => series === data.series)
    console.log(findRes);
    findRes.sort(function(a,b){
        return a.roll-b.roll;
    })
    const classes = useStyles();
    return (
        <Grid container spacing={3} justifyContent="center" className={classes.grid}>
            {
                findRes.map(res => {
                    return [
                        <Grid item xs={12} sm={4} >
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {res.name}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Email:{res.email}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Roll:{res.roll}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Series:{res.series}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Number:{res.number}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ]
                })
            }

        </Grid>
    );
};

export default StudentsInfo;