
export const intancesJson = [
  {
    instance: 'Nano',
    cpu: 2,
    memory: 0.5
  },
  {
    instance: 'Micro',
    cpu: 2,
    memory: 1
  },
  {
    instance: 'Small',
    cpu: 2,
    memory: 2
  },
  {
    instance: 'medium',
    cpu: 2,
    memory: 4
  },
  {
    instance: 'large',
    cpu: 2,
    memory: 8
  },
  {
    instance: 'xlarge',
    cpu: 4,
    memory: 16
  },
  {
    instance: '2xlarge',
    cpu: 8,
    memory: 32
  }
]

export function formatBytes(megabytes: number, decimals = 2) {
  if (megabytes === 0) return 0;

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['MB', 'GB'];

  const i = Math.floor(Math.log(megabytes) / Math.log(k));

  return parseFloat((megabytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}