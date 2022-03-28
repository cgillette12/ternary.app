import { Table, AccessTable } from './Dashboard.types'
export const intancesJson = [
  {
    instanceType: 'nano',
    requirements: (values: { memory: number }) => NatoRequiremnts(values)
  },
  {
    instanceType: 'micro',
    requirements: (values: { memory: number }) => MicroRequiremnts(values),
  },
  {
    instanceType: 'small',
    requirements: (values: { memory: number }) => SmallRequiremnts(values),
  },
  {
    instanceType: 'medium',
    requirements: (values: { memory: number }) => MediumRequiremnts(values),
  },
  {
    instanceType: 'large',
    requirements: (values: { memory: number }) => LargeRequiremnts(values),
  },
  {
    instanceType: 'xlarge',
    requirements: (values: { memory: number }) => XlargeRequiremnts(values),
  },
  {
    instanceType: '2xlarge',
    requirements: (values: { memory: number }) => XXlargeRequiremnts(values),
  }
]

function NatoRequiremnts({ memory }: { memory: number }) {
  const formatMemory = formatBytes(memory).split(' ')[0]
  const natomemory = 0.5 >= +formatMemory
  return natomemory
}

function MicroRequiremnts({ memory }: { memory: number }) {
  const formatMemory = formatBytes(memory).split(' ')[0]
  const natomemory = 0.5 < +formatMemory && 1 >= +formatMemory
  return natomemory
}

function SmallRequiremnts({ memory }: { memory: number }) {
  const formatMemory = formatBytes(memory).split(' ')[0]
  const natomemory = 1 < +formatMemory && 2 >= +formatMemory
  return natomemory
}

function MediumRequiremnts({ memory }: { memory: number }) {
  const formatMemory = formatBytes(memory).split(' ')[0]
  const natomemory = 2 < +formatMemory && 4 >= +formatMemory
  return natomemory
}

function LargeRequiremnts({ memory }: { memory: number }) {
  const formatMemory = formatBytes(memory).split(' ')[0]
  const natomemory = 4 < +formatMemory && 8 >= +formatMemory
  return natomemory
}

function XlargeRequiremnts({ memory }: { memory: number }) {
  const formatMemory = formatBytes(memory).split(' ')[0]
  const natomemory = 8 <= +formatMemory && 16 >= +formatMemory
  return natomemory
}

function XXlargeRequiremnts({ memory }: { memory: number }) {
  const formatMemory = formatBytes(memory).split(' ')[0]
  const natomemory = 16 < +formatMemory
  return natomemory
}

export function formatBytes(megabytes: number, decimals = 2): string {
  if (megabytes === 0) return "0";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['MB', 'GB'];

  const i = Math.floor(Math.log(megabytes) / Math.log(k));

  return parseFloat((megabytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const handleFilterByKey = ({ currentTableData, key, filterValue }: { currentTableData: Table[], key: AccessTable, filterValue?: string }) => {
  return filterValue ? currentTableData?.filter((data: Table) => data[key.keyName] === filterValue) : currentTableData
}

export const handleSearchFilter = ({ currentTableData, searchFilter }: { currentTableData: Table[], searchFilter?: string }) => {
  return searchFilter ? currentTableData?.filter((data: Table) => {
    const search = searchFilter?.trim() || ''
    return data.id.includes(search) || data.team.includes(search) || data.env.includes(search)
  }) : currentTableData;
}