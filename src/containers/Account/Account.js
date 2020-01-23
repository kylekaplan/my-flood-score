import React from "react";
import * as ROUTES from "../../routes/constants/routes";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import "./Account.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AccountSidebar from "./AccountSidebar/AccountSidebar";
import Dashboard from "./Dashboard";
import Inventory from "./Inventory/Inventory";
import Orders from "./Orders/Orders";
import Order from "./Orders/Order";
import Subscriptions from "./Subscriptions/Subscriptions";
import PaymentMethods from "./PaymentMethods/PaymentMethods";
import AccountSettings from "./AccountSettings/AccountSettings";
import Reports from "./Reports/Reports"
import { AccountContextProvider } from "./AccountContext";

const Account = () => {
  return (
    <AccountContextProvider>
      <Route
        render={() => (
          <>
            <Container className="acct-container">
              <Row>
                <AccountSidebar />
                <Col lg={9}>
                  <Switch>
                    <Route path={ROUTES.ACCOUNT_DASHBOARD} component={Dashboard} />
                    <Route path={ROUTES.ACCOUNT_INVENTORY} component={Inventory} />
                    <Route path={ROUTES.ACCOUNT_ORDERS} component={Orders} />
                    <Route path={ROUTES.ACCOUNT_SUBSCRIPTIONS} component={Subscriptions} />
                    <Route path={ROUTES.ACCOUNT_PAYMENT_METHODS} component={PaymentMethods} />
                    <Route path={ROUTES.ACCOUNT_SETTINGS} component={AccountSettings} />
                    <Route path={ROUTES.ACCOUNT_REPORTS} component={Reports} />

                    <Route path={"/account/order/:id"} component={Order} />
                  </Switch>
                </Col>
              </Row>
            </Container>
          </>
        )}
      />
    </AccountContextProvider>
  );
};

export default Account;
