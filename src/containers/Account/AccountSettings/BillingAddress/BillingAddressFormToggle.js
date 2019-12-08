import React, { useState } from "react";
import { StyledLink } from "../../StyledComponents";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BillingAddressForm from "./BillingAddressForm";

const BillingAddressFormToggle = props => {
  const [showBillingAddressForm, setShowBillingAddressForm] = useState(false);

  const toggleBillingAddressForm = () => {
    showBillingAddressForm === true
      ? setShowBillingAddressForm(false)
      : setShowBillingAddressForm(true);
  };

  const updateBillingAddress = (e, streetAddress1, streetAddress2) => {
    e.preventDefault();
    const updatedFirestoreUser = {
      ...props.firestoreUser,
      streetAddress1,
      streetAddress2
    };

    setShowBillingAddressForm(false);
    props.firebase.doFirestoreSet(
      "users",
      props.firestoreUser.uid,
      updatedFirestoreUser
    );
  };

  return (
    <Card style={{ border: "none" }}>
      {!showBillingAddressForm ? (
        <Card.Header style={{ padding: "20px 0 20px 0", backgroundColor: "#fff" }}>
          <Row sm={12}>
            <Col sm={10}>
              <h5>
                <b>Billing Address</b>
              </h5>
              <div>{props.firestoreUser.streetAddress1}</div>
              <div>{props.firestoreUser.streetAddress2}</div>
              <div>{props.firestoreUser.country}</div>
            </Col>
            <Col sm={2} style={{ textAlign: "right" }}>
              <StyledLink onClick={toggleBillingAddressForm}>
                Edit
              </StyledLink>
            </Col>
          </Row>
        </Card.Header>
      ) : (
        <Card.Header style={{ border: "none", padding: "20px 0 20px 0", backgroundColor: "#fff" }}>
          <Row sm={12}>
            <Col sm={10}>
              <h5>
                <b>Billing Address*</b>
              </h5>
              <p>
                Enter a valid billing address.
              </p>
            </Col>
            <Col sm={2} style={{ textAlign: "right" }}>
              <StyledLink onClick={toggleBillingAddressForm}>
                Cancel
              </StyledLink>
            </Col>
          </Row>
        </Card.Header>
      )}
      {showBillingAddressForm ? (
        <Card.Body>
          <BillingAddressForm
            firestoreUser={props.firestoreUser}
            firebase={props.firebase}
            updateBillingAddress={updateBillingAddress}
          />
        </Card.Body>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default BillingAddressFormToggle;