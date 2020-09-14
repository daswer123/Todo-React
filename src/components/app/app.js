import React from "react";
import Sidebar from "../sidebar";
import {Grid} from "@material-ui/core"
import MainContent from "../mainContent"
import "./app.css"

const App = () =>{
    return (
        <Grid container className="app">
            <Grid item xs={2} className="sidebar">
                <Sidebar/>
            </Grid>
            <Grid item xs={10} className="main-content">
                <MainContent/>
            </Grid>
        </Grid>
    )
}


export default (App);