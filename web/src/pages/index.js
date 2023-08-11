// import React and routing dependencies
import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import shared layout component
import Layout from "../components/Layout";

// import routes
import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";
import NotePage from "./note";

// define routes
const Pages = () => {
    return (
        <Router>
            {/* Wrap our routes within the Layout component */}
            <Layout>
                <Route exact path="/" component={Home} />
                <Route path="/mynotes" component={MyNotes} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/note/:id" component={NotePage}></Route>
            </Layout>
        </Router>
    )
};

export default Pages;