import React, { Component } from 'react'
import { Chart, Series, CommonSeriesSettings, SeriesTemplate, Title, Label, Format, Legend, Export, Tooltip } from 'devextreme-react/chart'
import axios from 'axios'
import { getConfig } from '../../../config'

export class TopClients extends Component {
  state = {
    data: []
  }

  getData = () => {

    let config = getConfig()
    let apiURL = config.apiURL
    let url = `${apiURL}/api/v1/reports/`

    let formData = new FormData();
    formData.append("report", "top-clients")
    axios.post(url, formData, { headers: { 'content-type': 'multipart/form-data' } })
      .then(async response => {
        this.setState({ data: response.data })
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <Chart
        id="chart-top-clients"
        dataSource={this.state.data}>
        <CommonSeriesSettings
          argumentField="name"
          valueField="count"
          type="bar"
          ignoreEmptyPoints={true}
        ><Label visible={true}>
            <Format type="fixedPoint" precision={0} />
          </Label></CommonSeriesSettings>
        <SeriesTemplate nameField="name" />
        <Title
          text="Clientes Recurrentes"
        />
        <Legend  visible={false} verticalAlignment="bottom" horizontalAlignment="center"></Legend>
        <Export enabled={true} />
        <Tooltip
          enabled={true}
          customizeTooltip={(pointInfo)=>{
            return {
              text: `${pointInfo.argumentText}<br/># ${pointInfo.valueText}`
            }
          }}
        />
      </Chart>
    )
  }
}

export default TopClients
