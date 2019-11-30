import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const ShippingAddress = (props) => {
  return (
    <Col>
      <Row>
        <span>
          <h3 className="title">
            Shipping Address
          </h3>
        </span>
        <span style={{ paddingLeft: '20px' }}>
          <div onClick={props.enableShippingForm} className="link">
            Edit
          </div>
        </span>
      </Row>
    </Col>
  )
}


export default ShippingAddress