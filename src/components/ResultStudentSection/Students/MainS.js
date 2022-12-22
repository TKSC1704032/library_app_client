import { CardActionArea, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userContext } from '../../App';
import bg from '../../Images/1stb.jfif';
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
        background: 'transparent',
        boxShadow: '5px 25px 25px '
    },
    media: {
        height: 140,
    },
    grid: {
        height: '100%',
        alignItems: 'center',
        backgroundImage: `url(${bg})`
    },
    type: {
        textAlign: 'center'
    }
}));
const MainS = () => {
    const { id, sem } = useParams()
    //console.log(id)
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const [res, setRes] = useState([])
    const [loading, SetLoading] = useState(true);
    useEffect(() => {
        if (id === 'srs') {
            fetch('http://localhost:5000/semRes/')
                .then(res => res.json()
                    .then(data => {
                        console.log(data)
                        setRes(data)
                        SetLoading(false)
                    }))

        }
        if (id === 'ats') {
            fetch('http://localhost:5000/students/')
                .then(res => res.json()
                    .then(data => {
                        console.log(data)
                        setRes(data)
                        SetLoading(false)
                    }))

        }
        if (id === 'cts') {
            fetch('http://localhost:5000/ctRes/')
                .then(res => res.json()
                    .then(data => {
                        console.log(data)
                        setRes(data)
                        SetLoading(false)
                    }))

        }
    }, [])
    const findRes1 = res.filter(data => loggedInUser.email === data.email)
    console.log(findRes1)
    const findRes = findRes1.filter(data => sem === data.sem);
    console.log(findRes)
    const findInfo = res.find(data => loggedInUser.email === data.email)
    const classes = useStyles();
    return (
        <>

            {
                id === 'srs' &&
                <div style={{ backgroundImage: `url(${bg})`, height: '100vh' }}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {findRes[0] && findRes[0].name}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                {findRes[0] && findRes[0].roll}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                GP:{findRes[0] && findRes[0].gp}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                Semester Earn Credit:{findRes[0] && findRes[0].sec}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                GPA:{findRes[0] && findRes[0].gpa}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                Yearly Earn Credit:{findRes[0] && findRes[0].yec}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                Total Earn Credit:{findRes[0] && findRes[0].tec}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                CGPA:{findRes[0] && findRes[0].cgpa}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                Failed Subjects:{findRes[0] && findRes[0].log}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            }
            {id === 'ats' &&
                <div style={{ backgroundImage: `url(${bg})`, height: '100vh' }}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {findInfo && findInfo.name}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                Roll:{findInfo && findInfo.roll}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                Email:{findInfo && findInfo.email}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                Series:{findInfo && findInfo.series}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                Mobile:{findInfo && findInfo.number}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            }
            {id === 'cts' &&
                <Grid container spacing={3} justifyContent="center" className={classes.grid}>
                    {findRes.map(res => {
                        return [
                            <Grid item xs={12} sm={4} >
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {res.name}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Roll:{res.roll}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Course Name:{res.cname}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                CT1:{res.ct1}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                CT2:{res.ct2}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                CT3:{res.ct3}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                CT4:{res.ct4}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                CT Average:{Math.round((parseInt(res.ct1) + parseInt(res.ct2) + parseInt(res.ct3) + parseInt(res.ct4) - Math.min(parseInt(res.ct1), parseInt(res.ct2), parseInt(res.ct3), parseInt(res.ct4))) / 3) || ' '}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="h2">
                                            Attendance Marks:{res.ap.length===4? 8 :parseInt(res.ap.slice(0,2))>90 && 8  || parseInt(res.ap.slice(0,2))<50 && 0 || parseInt(res.ap.slice(0,2))>80 && 6  || parseInt(res.ap.slice(0,2))>70 && 5  || parseInt(res.ap.slice(0,2))>60 && 3  }
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ]
                    })}
                </Grid>
            }
        </>

    );
};

export default MainS;