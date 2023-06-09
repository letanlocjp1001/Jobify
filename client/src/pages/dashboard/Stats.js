import { useEffect } from 'react'
import { StatsContainer, ChartsContainer, Loading } from '../../components'
import { useAppContext } from '../../context/appContext'

const Stats = () => {
  const { showStats, isLoading, monthyApplications } = useAppContext()

  useEffect(() => {
    showStats()
    // eslint-disable-next-line
  }, [])
  if (isLoading) {
    return <Loading center />
  }
  return (
    <div>
      <StatsContainer />
      {monthyApplications.length > 0 && <ChartsContainer />}
    </div>
  )
}
export default Stats
