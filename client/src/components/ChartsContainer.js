import { useState } from 'react'
import BarCharts from './BarCharts'
import AreaChart from './AreaChart'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ChartsContainer'

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true)
  const { monthyApplications: data } = useAppContext()
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarCharts data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  )
}
export default ChartsContainer
