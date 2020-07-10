import React, { Component } from 'react'
import TopServices from './charts/TopServices';
import TopClients from './charts/TopClients';
import AppointmentsByMonth from './charts/AppointmentsByMonth';
import SalesByMonth from './charts/SalesByMonth';
import { Row, Col, Container, Card } from 'react-bootstrap';


export class Dashboard extends Component {
  render() {
    let charts = [
      <TopServices />,
      <TopClients />,
      <AppointmentsByMonth />,
      <SalesByMonth />
    ]
    return (
      <div className="dashboard-container">
        <Row>
          {charts.map((chart, i) => {
            return (<Col key={"chart-" + i} md="4" xs="12" sm="6" lg="4" className="chart-container">
              <Card>
                <Card.Body>
                  {chart}
                </Card.Body>
              </Card>
            </Col>);
          })}
        </Row>
      </div>
    )
  }
}

export default Dashboard
