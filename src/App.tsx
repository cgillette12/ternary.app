import { useState, useEffect } from 'react';
import './App.scss';
import { apiFetch } from './api/API'
import Dashboard from './views/index'
import Loader from './components/Loader/Loader'
import { ComputeUtilization, Filterables } from './App.types'
import { formatBytes } from './views/Dashboard/Dashboard.utils'
function App() {
  const [instanceUsage, setInstanceUsage] = useState<ComputeUtilization[] | null>(null)
  const [isLoading, setisLoading] = useState<boolean>(false)
  const [filterables, setFilterables] = useState<Filterables>({ teams: [], envs: [], cpuSizes: [], memSizes: [] })

  useEffect(() => {
    init()
  }, [])

  const init = async (): Promise<void> => {
    try {
      setisLoading(true)
      const instanceJson: ComputeUtilization[] = await apiFetch('instanceUsage.json')
      const filterables: Filterables = { teams: [], envs: [], cpuSizes: [], memSizes: [] }
      instanceJson?.forEach((instance: ComputeUtilization) => {
        const { memory, cpus } = instance
        const { team, environment } = instance.labels
        const mem = +formatBytes(memory).split(' ')[0]
        if (!filterables.cpuSizes.includes(cpus)) {
          filterables.cpuSizes = [...filterables.cpuSizes, cpus]
        }
        if (!filterables.memSizes.includes(mem)) {
          filterables.memSizes = [...filterables.memSizes, +mem]
        }
        if (!filterables.teams.includes(team)) {
          filterables.teams = [...filterables.teams, team]
        }
        if (!filterables.envs.includes(environment)) {
          filterables.envs = [...filterables.envs, environment]
        }
      })
      filterables.cpuSizes = filterables.cpuSizes.sort((a: number, b: number) => a <= b ? -1 : 0);
      filterables.memSizes = filterables.memSizes.sort((a: number, b: number) => a <= b ? -1 : 0);
      setFilterables(filterables)
      setInstanceUsage(instanceJson)
      setTimeout(() => {
        setisLoading(false)
      }, 3000)
    } catch (error: any) {
      setisLoading(false)
    }
  }
  if (isLoading) {
    return (
      <div className='min-vh-100 w-100 d-flex justify-content-center align-items-center flex-grow-1'>
        <Loader message='...loading' />
      </div>)
  }

  return (
    <div className='App vh-100'>
      <header className='App-header bg-primary p-3 text-white'>
        <h2>Ternary app</h2>
      </header>
      <Dashboard instanceUsage={instanceUsage || null} filterables={filterables || []} />
    </div>
  );
}

export default App;
