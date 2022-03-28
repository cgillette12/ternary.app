import { ComputeUtilization } from '../../App'

export interface IDashboard {
  instanceUsage: ComputeUtilization[] | null
  filterables: any | null
}

export interface Table {
  cpuPresentage: number
  cpuUsage: string
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