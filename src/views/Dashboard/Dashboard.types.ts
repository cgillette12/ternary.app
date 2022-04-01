import { ComputeUtilization } from '../../App.types'

export interface IDashboard {
  instanceUsage: ComputeUtilization[] | null
  filterables: { teams: string[], envs: string[], cpuSizes: number[], memSizes: number[] }
}

export interface Table {
  cpuPresentage: number
  cpuUsage: number
  cpus: number
  env: string
  id: string
  labels: Labels
  memPresentage: number
  memUsage: string
  memory: string
  status: string
  team: string
  type: string
}
export interface AccessTable {
  keyName: keyof Table; 
}

interface Labels {
  team: string;
  environment: string
}