/*
 * This file is edited by Vatsaly Patel
 * Note: If you are editing anything, please let me know - or do comment [it's compulsory]
 */

import React, { PureComponent, Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import appRoutes from "./appRoutes";

import DashboardLayout from "../Layouts/Dashboard";

import FlightListPage from "../Components/FlightList";

class AppRoutes extends PureComponent {
  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/flight/list" />

                <Router>
                  <Switch>
                    <DashboardLayout>
                      <Route
                        path={`${appRoutes.flightList}`}
                        component={FlightListPage}
                      />
                    </DashboardLayout>
                  </Switch>
                </Router>
              

            <Redirect from="*" to="/login" />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default AppRoutes;
