import { Dropdown } from "react-bootstrap";
interface IDropdown {
  options: any[],
  value: string,
  label: string,
  onChange: (eventValue: string) => void
}

function SimpleDropdown({ options, label, value, onChange }: IDropdown) {

  const renderItems = () => {
    return options?.map((values: string, idx: number) => {
      return <Dropdown.Item key={idx} onClick={() => onChange(values)}>{values}</Dropdown.Item>
    })
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {value ? value : label}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onChange('')}>{label}</Dropdown.Item>
        {renderItems()}
      </Dropdown.Menu>
    </Dropdown>

  )
}

export default SimpleDropdown