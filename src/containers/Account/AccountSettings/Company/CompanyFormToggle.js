import React, { useState } from "react";
import { Container, LinkPrimary } from "../../../../StyledComponents/StyledComponents";
import { AccountSettingsFormContainer } from "../../StyledComponents/StyledComponents";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CompanyForm from "./CompanyForm";
import { useDispatch } from "react-redux";
import { pushSuccess } from "../../../../redux/actions/notificationActions";

const CompanyFormToggle = props => {
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const dispatch = useDispatch();

  const toggleCompanyForm = () => {
    showCompanyForm === true
      ? setShowCompanyForm(false)
      : setShowCompanyForm(true);
  };

  const updateCompany = (e, firestoreUser, firebase, companyName) => {
    e.preventDefault();
    const updatedFirestoreUser = {
      ...firestoreUser,
      companyName
    };

    setShowCompanyForm(false);
    firebase.doFirestoreSet("users", firestoreUser.uid, updatedFirestoreUser);
    dispatch(pushSuccess("Successfully updated company name"));
  };

  return (
    <Container padding="20px 0 20px 0" borderBottom="1px solid #eee">
      {!showCompanyForm ? (
        <Row sm={12}>
          <Col sm={10}>
            <h5>
              <b>Company Name</b>
            </h5>
            <p>
              {props.firestoreUser.companyName === ""
                ? "Not Provided"
                : props.firestoreUser.companyName}
            </p>
          </Col>
          <Col sm={2} style={{ textAlign: "right" }}>
            <LinkPrimary onClick={toggleCompanyForm}>Edit</LinkPrimary>
          </Col>
        </Row>
      ) : (
        <Row sm={12}>
          <Col sm={10}>
            <h5>
              <b>Company Name (optional)</b>
            </h5>
            <p>Enter your company name.</p>
          </Col>
          <Col sm={2} style={{ textAlign: "right" }}>
            <LinkPrimary onClick={toggleCompanyForm}>Cancel</LinkPrimary>
          </Col>
        </Row>
      )}

      {showCompanyForm ? (
        <CompanyForm
          firestoreUser={props.firestoreUser}
          firebase={props.firebase}
          updateCompany={updateCompany}
        />
      ) : (
        <></>
      )}
    </Container>
  );
};

export default CompanyFormToggle;
