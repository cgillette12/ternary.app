import { Dropdown } from "react-bootstrap";
interface IDropdown {
  options: any[],
  value: string,
  label: string,
  variantColor?: string,
  onChange: (eventValue: string) => void
}

function SimpleDropdown({ options, label, value,variantColor, onChange }: IDropdown) {

  const renderItems = () => {
    return options?.map((values: string, idx: number) => {
      return <Dropdown.Item className='text-light' key={idx} onClick={() => onChange(values)}>{values}</Dropdown.Item>
    })
  }

  return (
    <>
      <label className='text-light' style={{ fontSize: 14 }}>{label}</label>
      <Dropdown>
        <Dropdown.Toggle variant={variantColor ? variantColor : "primary"} id="dropdown-basic" style={{ width: 150 }}>
          {value ? value : label}
        </Dropdown.Toggle>

        <Dropdown.Menu className='bg-dark mt-1'>
          <Dropdown.Item className='text-light' onClick={() => onChange('')}>{label}</Dropdown.Item>
          {renderItems()}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default SimpleDropdown