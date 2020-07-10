import React, { Component } from 'react'
import { Chart, Series, CommonSeriesSettings, SeriesTemplate, Title, Label, Format, Legend, Export, Tooltip } from 'devextreme-react/chart'
import axios from 'axios'
import { getConfig } from '../../../config'

export class AppointmentsByMonth extends Component {
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
    formData.append("report", "appointments-by-month")
    axios.post(url, formData, { headers: { 'content-type': 'multipart/form-data' } })
      .then(async response => {
        let new_data = [...this.state.data];
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          new_data[new Date(element.month).getUTCMonth()]["value"] = element.count;
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
      <Chart
        id="chart-appointments-by-month"
        dataSource={this.state.data}>
        <CommonSeriesSettings
          argumentField="month"
          valueField="value"
          type="area"
          ignoreEmptyPoints={true}
        ><Label visible={true}>
            <Format type="fixedPoint" precision={0} />
          </Label></CommonSeriesSettings>


        <Series valueField="value" name="month" />
        <Title
          text="Meses con mas concurrencia"
          subtitle="Año presente"
        />
        <Legend visible={false} verticalAlignment="bottom" horizontalAlignment="center"></Legend>
        <Export enabled={true} />
        <Tooltip
          enabled={true}
          customizeTooltip={(pointInfo) => {
            return {
              text: `${pointInfo.argumentText}<br/># ${pointInfo.valueText}`
            }
          }}
        />
      </Chart>
    )
  }
}

export default AppointmentsByMonth
