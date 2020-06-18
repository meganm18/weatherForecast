import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import 'index.js'

export default function App() {
    return(
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/today">Today</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/today">
                        <Today />
                    </Route>
                    <Route path="/">
                        <Weather />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}
function Today() {
    return <h3>Today</h3>;
}