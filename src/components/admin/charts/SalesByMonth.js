import React, { Component } from 'react'
import { Chart, Series, CommonSeriesSettings, SeriesTemplate, Title, Label, Format, Legend, Export, Tooltip, PieChart, Connector } from 'devextreme-react/pie-chart'
import axios from 'axios'
import { getConfig } from '../../../config'
import { numberWithCommas } from '../../../utils'

export class TopServices extends Component {
  constructor(props) {
    super(props);
    let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    this.state = {
      data: months.map((month, i) => {
        return { month, value: 0, month_index: i }
      })
    }

  }

  getData = () => {
    let config = getConfig()
    let apiURL = config.apiURL
    let url = `${apiURL}/api/v1/reports/`
    let formData = new FormData();
    formData.append("report", "sales-by-month")
    axios.post(url, formData, { headers: { 'content-type': 'multipart/form-data' } })
      .then(async response => {
        let new_data = [...this.state.data];
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          new_data[new Date(element.month).getUTCMonth()]["value"] = element.value;
        }
        this.setState({ data: new_data })
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    try {
      this.getData();
    } catch (error) {

    }

  }

  render() {
    return (
      <PieChart
        id="pie"
        type="doughnut"
        dataSource={this.state.data}>
        <Series argumentField="month" valueField="value">
          <Label visible={true} customizeText={(pointInfo)=>{
            return `$${numberWithCommas(pointInfo.originalValue)}`
          }} >
            <Connector visible={true} />
          </Label>
        </Series>
        <Title
          text="Ventas por Mes"
          subtitle="Año presente"
        />
        <Legend
          margin={0}
          horizontalAlignment="right"
          verticalAlignment="top"
        />
        <Export enabled={true} />
        <Tooltip
          enabled={true}
          customizeTooltip={(pointInfo) => {
            return {
              text: `${pointInfo.argumentText}<br/>$${numberWithCommas(pointInfo.valueText)}`
            }
          }}
        ></Tooltip>
      </PieChart>
    )
  }
}

export default TopServices
