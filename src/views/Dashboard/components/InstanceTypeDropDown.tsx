import { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import SimpleDropdown from '../../../components/SimpleDropdown/SimpleDropdown'
import { Filterables } from '../../../App.types'
interface InstanceTypes {
  filterables: Filterables,
  value: undefined | string
  onChange: (value: string) => void
  handleTypeRequirements: (values: { memory: number, cpus: number }) => string;
}
function InstanceTypeDropDown({ filterables, value, handleTypeRequirements, onChange }: InstanceTypes) {
  const [instanceType, setInstanceType] = useState<string>('')
  const [selectedCpu, setSelectedCpu] = useState<string>('')
  const [selectedMem, setSelectedMem] = useState<string>('')
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false)
  
  useEffect(() => {
    const typeValue = handleTypeRequirements({ memory: +selectedMem, cpus: +selectedCpu })
    setInstanceType(typeValue)
  }, [selectedCpu, selectedMem, handleTypeRequirements])

  return (
    <>
      <label style={{ fontSize: 14 }}>Type</label>
      <Dropdown className='bg-dark-500' show={isDropDownOpen} autoClose={false} onToggle={() => setIsDropDownOpen(!isDropDownOpen)}>
        <Dropdown.Toggle variant='primary' id='dropdown-basic' style={{ width: 150 }}>
          {value ? value : 'Select Type'}
        </Dropdown.Toggle>
        <Dropdown.Menu className='bg-dark mt-1'>
          <div className='px-2 text-light'>value: {instanceType}</div>
          <div className='d-flex px-2'>
            <div className='me-2'>
              <SimpleDropdown
                label='CPU'
                variantColor='secondary'
                options={filterables?.cpuSizes || []}
                value={selectedCpu}
                onChange={(cpu: string) => setSelectedCpu(cpu)}
              />
            </div>
            <div>
              <SimpleDropdown
                label='Memory'
                variantColor='secondary'
                options={filterables?.memSizes || []}
                value={selectedMem}
                onChange={(status: string) => setSelectedMem(status)}
              />
            </div>
          </div>
          <div className='w-100 d-flex justify-content-end px-2 mt-3'>
            <button
              className='btn btn-primary text-right'
              onClick={() => {
                setIsDropDownOpen(false)
                onChange(instanceType)
              }}>
              apply
            </button>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default InstanceTypeDropDown