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

export interface Labels {
  team: string;
  environment: string
}

export interface Filterables {
  teams: string[],
  envs: string[],
  cpuSizes: number[],
  memSizes: number[]
}