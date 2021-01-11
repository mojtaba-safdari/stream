import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import List from '../components/stream/List';
import Create from '../components/stream/Create';
import Edit from '../components/stream/Edit';
import Delete from '../components/stream/Delete';
import Show from '../components/stream/Show';


export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={List} exact />
                <Route path="/stream/create" component={Create} />
                <Route path="/stream/edit/:id" component={Edit} />
                <Route path="/stream/delete/:id" component={Delete} />
                <Route path="/stream/:id" component={Show} />
            </Switch>
        </Router>
    )
}
