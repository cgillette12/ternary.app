import { useState, ComponentProps } from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { PieChart } from 'react-minimal-pie-chart'

interface IPieChart {
  presentage: number | undefined;
}

interface IPieProps {
  handleData: ComponentProps<typeof PieChart>['data'];
}

function SimplePieChart({ presentage }: IPieChart) {
  const [hovered, setHovered] = useState<number | null>(0);
  const handleData: { title: string; value: number; color: string; tooltip?: string }[] = 100 - (presentage || 0) ? (
    [
      { title: '', value: presentage || 0, color: hovered === 0 ? '#5745B3' : '#000', tooltip: 'Used' },
      { title: '', value: 100 - (presentage || 0), color: hovered === 1 ? '#5745B3' : '#000', tooltip: 'Left' }
    ])
    : [{ title: '', value: presentage || 0, color: '#5745B3', tooltip: 'Used' }]

  const makeTooltipContent = (entry: IPieProps['handleData'][0]) => {
    const contentValue = entry.tooltip === "Left" ? `${entry.value}% Left` : `${entry.value}% Used`
    return contentValue;
  }


  return (
    <>
      <PieChart
        label={({ dataEntry }) => `${dataEntry.title} ${dataEntry.value}%`}
        data={handleData}
        radius={PieChart.defaultProps.radius - 10}
        segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
        segmentsShift={(index) => (index === 0 ? .2 : 0.5)}
        animate
        animationDuration={1000}
        animationEasing="ease-out"
        lengthAngle={360}
        startAngle={270}
        center={[50, 50]}
        labelPosition={100 - (presentage || 0) ? 50 : 0}
        viewBoxSize={[100, 100]}
        labelStyle={{
          fill: '#fff',
          fontSize: '4px',
        }}
        onMouseOver={(_, index) => {
          setHovered(index);
        }}
      />
      <OverlayTrigger
        delay={{ show: 250, hide: 400 }}
        placement="right"
        overlay={<Tooltip id={`button-tooltip-${hovered}`} />}
      >
        <div>{typeof hovered === 'number' ? makeTooltipContent(handleData[hovered]) : null}</div>
      </OverlayTrigger>
    </>
  )
}

export default SimplePieChart