import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import './Reports.css'

import FloodScoreGauge from '../../components/Charts/FloodScoreGauge'

import Compare from '../../assets/images/Compare.svg'
import Examine from '../../assets/images/Examine.svg'
import Certificate from '../../assets/images/Certificate.svg'
import Reduce_Eliminate from '../../assets/images/Reduce_Eliminate.svg'
import MFS_Logo from '../../assets/images/MFS_Logo.png'

import Green_House from '../../assets/images/Green_House.svg'
import Blue_House from '../../assets/images/Blue_House.svg'
import Red_House from '../../assets/images/Red_House.svg'
import MFS_Text_Logo from '../../assets/images/MFS_Text_Logo.svg'


// import * as ROUTES from '../../constants/routes'
import * as ROUTES from '../../routes/constants/routes'

const range = [
  {
    under: 0,
    result: 'Very Good'
  },
  {
    under: 20,
    result: 'Very Good',
  },
  {
    under: 30,
    result: 'Good',
  },
  {
    under: 50,
    result: 'Fair',
  },
  {
    under: 70,
    result: 'Poor',
  },
  {
    under: 95,
    result: 'Extremely Poor',
  }
]

const getRiskCategory = (score) => {
  for (let i = 0; i < range.length; i++) {
    const cat = range[i];
    if (cat.under >= score) {
      return cat.result
    }
  }
  return null
}

const getRiskRange = (score) => {
  for (let i = 0; i < range.length; i++) {
    const cat = range[i];
    if (cat.under >= score) {
      return `${range[i-1].under}-${range[i].under}`
    }
  }
  return null
}

const LearnMoreBox = ({ title, description, img, link, extra }) => (
  <Container className="learnMoreBox">
    <Row>
      <Col xs={9}>
        <h3>{title}</h3>
        <p>
          {description}
        </p>
        <p className="italic" style={{ lineHeight: '8px' }}>{extra}</p>
      </Col>
      <Col xs={3}>
        <Container>
          <Row>
            <img src={img} alt={title} />
          </Row>
          <Row>
            <Button className="learnMoreButton" href={link}>Learn More</Button>
          </Row>
        </Container>
      </Col>
    </Row>
  </Container>
)

const DiscoverReport = (props) => {
  const { report } = props
  const [property, setProperty] = useState(null)

  useEffect(() => {
    getAllData()
}, [])

const getAllData = async () => {
  const { property } = report
  const propertyData = await getPropertyData(property)
  setProperty(propertyData)
}

const getPropertyData = async (propertyRef) => {
  const doc = await propertyRef.get()
  if (doc.exists) {
    return await doc.data()
  } else {
    return 'not found'
  }
}

const getLOMARecommendation = (property) => {
  if (property.LOMA === 0) {
    return 'N/A'
  } else if (property.LOMA === 1) {
    return 'Low'
  } else if (property.LOMA === 2) {
    return 'Medium'
  } else if (property.LOMA === 3) {
    return 'High'
  } else {
    return 'N/A'
  }
}

if (!property) {
  return 'loading...'
}
if (property === "not found") {
  return 'No Report Found'
}

  const {
    MFS,
    PROP_ADD,
    PROP_CITY,
    PROP_STATE,
    PROP_ZIP,
    SGE,
    FEMA_BFE,
  } = property

  return (
    <div id="reportContainer">
      <h3 className="authHeader" style={{ textAlign: 'center', fontWeight: 'bold', color: '#595959' }}>
        Discover Report
      </h3>
      <div className="reportContainer">
        <div className="reportHeader">
          <img src={MFS_Logo} alt="logo" />
        </div>
        <div className="reportSection" style={{ marginTop: '-22px' }}> { /* Section One */ }
          <Container>
            <Row>
              <Col style={{ paddingLeft: '43px' }}>
                <div style={{ marginBottom: '67px' }}>
                  <img src={Green_House} style={{ width: '50px', left: '40px' }} alt="Green House" />
                  <img src={Blue_House} style={{ width: '65px', left: '95px' }} alt="Blue House" />
                  <img src={Red_House} style={{ width: '42px', left: '150px' }} alt="Red House" />
                </div>
                <p className="bold" style={{ marginBottom: '0rem' }}>Property<br />Address:</p>
                <p>{PROP_ADD}<br />{PROP_CITY}, {PROP_STATE} {PROP_ZIP}</p>
                {/* <p>{props.PROP_ADD}</p> */}
              </Col>
              <Col style={{ left: '100px' }}>
                <FloodScoreGauge MFS={MFS} index={0} />
              </Col>
            </Row>
          </Container>
          <div className="warningMessage">
            <h4>A My Flood Score of <span className="bold">{MFS}</span> falls within the
            <span className="bold"> {getRiskRange(MFS)} range</span>. This represents an overal
            <span className="bold"> {getRiskCategory(MFS)}</span> flood risk</h4>
          </div>
        </div>
        <div className="reportSection learMore"> { /* Section Two */ }
          <h3 style={{ paddingLeft: '6px' }}>Want to learn more...</h3>
          <LearnMoreBox
            title="My flood snapshot"
            description="Compare your property's score with that of property another, identify key flood influencers, see how your score compares to your community."
            img={Compare}
            link={ROUTES.COMPARE}
            extra={null}
          />
          <LearnMoreBox
            title="My flood Analysis Memo"
            description="Your detailed flood risk analysis. Floodplain maps, building and structure impacts, and flood insurance premium estimates"
            img={Examine}
            link={ROUTES.EXAMINE}
            extra="A 5-page report thoroughly reviewing your flood risk!"
          />
          {(MFS < 25) &&
            <LearnMoreBox
              title="My flood Safe Certificate"
              description="My flood Safe Certificate is certified by our Professional Water Resource Engineers"
              img={Certificate}
              link={ROUTES.CERTIFY}
              extra="Recommended for MyFloodScores less than 25"
            />
          }
          <LearnMoreBox
            title="Letter of Map Amendment (LOMA)"
            description="Reduce or Eliminate your flood insurance premium through a FEMA Approved Letter of Map Amendment"
            img={Reduce_Eliminate}
            link={ROUTES.REDUCE}
            extra={
              <span className="LOMACat">
                <span className={(getLOMARecommendation(property) === 'High') ? "LOMASelect" : undefined} style={{ backgroundColor: '#00B366' }}>High</span>
                <span className={(getLOMARecommendation(property) === 'Medium') ? "LOMASelect" : undefined} style={{ backgroundColor: '#FED220' }}>Medium</span>
                <span className={(getLOMARecommendation(property) === 'Low' || getLOMARecommendation(property) === 'N/A') ? "LOMASelect" : undefined} style={{ backgroundColor: '#FF605F' }}>Low</span>
              </span>
            }
          />
        </div>
        <div className="reportSection" style={{ padding: '20px' }} > { /* Section Three */ }
          <p>
            <img src={MFS_Text_Logo} height={20} />was developed through analyzing the best available floodplain data, combined with details of the property structure and land parcel.  Additional flood factors were also considered, including your community's commitment to floodplain management.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DiscoverReport
