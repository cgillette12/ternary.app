import { PieChart } from 'react-minimal-pie-chart'
interface IPieChart {
  presentage: number | undefined;
}

function SimplePieChart({ presentage }: IPieChart) {
  const handleData:{ title: string; value: number; color: string; }[] = 100 - (presentage || 0) ? (
    [
      { title: '', value: presentage || 0, color: '#5745B3' },
      { title: '', value: 100 - (presentage || 0), color: '#000' }
    ])
    : [{ title: '', value: presentage || 0, color: '#5745B3' }]
  return (
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
        pointerEvents: 'none',
        fontSize: '4px',
      }}
    />
  )
}

export default SimplePieChart