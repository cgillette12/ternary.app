import { useState, useEffect } from 'react';
import './App.scss';
import { apiFetch } from './api/API'
import Dashboard from './views/index'
import Loader from './components/Loader/Loader'

export interface ComputeUtilization {
  // The name of the compute instance in the cloud platform.
  id: string;
  // Arbitrary key-value labels associated with this instance and others like it
  // (e.g. team, environment, cost-center)
  labels: Labels;
  // Configured number of cores of this instance
  cpus: number;
  // Observed mean usage of CPU in fractional cores in the past 30 days.
  cpuUsage: number;
  // Configured amount of RAM in megabytes on this instance
  memory: number;
  // Observed mean usage of RAM in megabytes in the past 30 days.
  memUsage: number;
}

interface Labels {
  team: string;
  environment: string
}

function App() {
  const [error, setError] = useState<string | null>(null)
  const [instanceUsage, setInstanceUsage] = useState<ComputeUtilization[] | null>(null)
  const [isLoading, setisLoading] = useState<boolean>(false)
  const [teams, setTeams] = useState<string[]>()

  useEffect(() => {
    init()
  }, [])
  const init = async (): Promise<void> => {
    try {
      setisLoading(true)
      const instanceJson: ComputeUtilization[] = await apiFetch('instanceUsage.json')
      const allTeams: string[] = []

      instanceJson.map((instance: ComputeUtilization) => !allTeams.includes(instance.labels.team) ? allTeams.push(instance.labels.team) : null)
      const testPrecent = Math.floor(39684.97764102355/65536 * 100)
      setTeams(allTeams)
      setInstanceUsage(instanceJson)
      // setTimeout(() => {
      // }, 5000)
      setisLoading(false)
      console.log(testPrecent)
    } catch (error: any) {
      setisLoading(false)
      setError(error)
    }
  }
  if (isLoading) {
    return (
      <div className="min-vh-100 w-100 d-flex justify-content-center align-items-center flex-grow-1">
        <Loader message='...loading' />
      </div>)
  }
  return (
    <div className="App">
      <header className="App-header bg-primary p-3 text-white">
        <h2>Ternary app</h2>
      </header>
      <Dashboard instanceUsage={instanceUsage || null} />
    </div>
  );
}

export default App;
