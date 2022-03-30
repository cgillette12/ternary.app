import { Dropdown } from "react-bootstrap";
import SimpleDropdown from '../../../components/SimpleDropdown/SimpleDropdown'

function InstanceTypeDropDown(params: any) {
  return (
    <>
      <label style={{ fontSize: 14 }}>Type</label>
      <Dropdown className='bg-dark-500'>
        <Dropdown.Toggle variant="primary"  id="dropdown-basic" style={{ width: 150 }}>
          Type
        </Dropdown.Toggle>

        <Dropdown.Menu className='bg-dark mt-1'>
          <div className='d-flex px-2'>
            <div className='me-2'>
              <SimpleDropdown
                label='cpu'
                variantColor='secondary'
                options={['Right Sized', 'Warning', 'Danger']}
                value={'Right Sized'}
                onChange={(status: string) => {
                  // setStatusFilter(status)
                  console.log(status)
                }}
              />
            </div>
            <div>
              <SimpleDropdown
                label='memory'
                variantColor='secondary'
                options={['Right Sized', 'Warning', 'Danger']}
                value={'Right Sized'}
                onChange={(status: string) => {
                  // setStatusFilter(status)
                  console.log(status)
                }}
              />
            </div>
          </div>
          <div className='w-100 d-flex justify-content-end px-2 mt-3'>
            <button className='btn btn-primary text-right '>apply</button>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default InstanceTypeDropDown