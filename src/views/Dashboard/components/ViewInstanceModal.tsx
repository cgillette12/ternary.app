import { useState, useEffect } from 'react'
import { Modal, Button, Badge, CloseButton } from 'react-bootstrap';
import { Table } from '../Dashboard.types'
import SimplePieChart from '../../../components/SimplePieChart/SimplePieChart'
interface IModal {
  isOpen: boolean;
  instance: Table | undefined;
  onModalClose: () => void,
  data?: any;
};

function ViewInstanceModal({ isOpen, instance, onModalClose }: IModal) {
  const [cpusRec, setCpuRec] = useState('')
  const [memRec, setMemRec] = useState('')
  const {
    cpuPresentage,
    cpuUsage,
    cpus,
    env,
    id,
    memPresentage,
    memUsage,
    memory,
    team,
    type,
  } = instance || {}

  useEffect(() => {
    const renderRecommendations = () => {
      const memValue = memPresentage || 0
      const cpuValue = cpuPresentage || 0
      const memorySize = memValue === 100 ? 'should increase size of Memory' : memValue < 100 && memValue >= 60 ? `Memory is properly size` : (memValue < 59 && memValue > 50) ? 'Memory could require services' : 'Decrease size of Memory';
      const cpuSize = cpuValue === 100 ? 'should increase size of CPU' : cpuValue < 100 && cpuValue >= 60 ? `CPU is properly size` : (cpuValue < 59 && cpuValue > 50) ? 'CPU could require services' : 'Decrease size of CPU';
      setMemRec(memorySize)
      setCpuRec(cpuSize)
    }
    renderRecommendations()
  }, [cpuPresentage, memPresentage])




  return (
    <Modal
      show={isOpen}
      onHide={onModalClose}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='border border-0'
    >
      <Modal.Header className='bg-dark-500'>
        <Modal.Title className='w-100 text-light'>
          {id}
          <Badge bg='primary ms-3'>{team}</Badge>
          <Badge bg='primary ms-3'>{env}</Badge>
        </Modal.Title>
        <CloseButton onClick={onModalClose} variant="white" />
      </Modal.Header>

      <Modal.Body className='bg-dark-500 text-white'>
        <h5 className='mb-3'>Type:<Badge bg='dark ms-3 me-2'>{type}</Badge>--{'>'}<Badge bg='success ms-2'>{type}</Badge> </h5>
        <div className='d-flex bg-dark-500 text-white'>
          <div className='w-100 card p-3 mx-2 bg-dark-500 text-white'>
            <div className='d-flex justify-content-between' >
              <div className='font-600'>CPU Info:</div>
              <div>CPU: {cpus}</div>
              <div>Usage: {cpuUsage}</div>
              <div>% Used: {cpuPresentage}%</div>
            </div>
            <div className='d-flex mt-3 justify-content-end'>
              <div className='font-600 '>Recommendation: <span className='font-400'>{cpusRec}</span></div>
            </div>
            <SimplePieChart presentage={cpuPresentage} />
          </div>
          <div className='w-100 card p-3 mx-2 bg-dark-500 text-white'>
            <div className='d-flex justify-content-between' >
              <div className='font-600'>Memory Info:</div>
              <div>Memory: {memory}</div>
              <div>Usage: {memUsage}</div>
              <div>% Used: {memPresentage}%</div>
            </div>
            <div className='d-flex justify-content-end mt-3'>
              <div className='font-600'>Recommendation: <span className='font-400'>{memRec}</span></div>
            </div>
            <SimplePieChart presentage={memPresentage} />
          </div>
        </div>

      </Modal.Body>
      <Modal.Footer className='bg-dark-500 text-white'>
        <Button variant='primary' onClick={onModalClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewInstanceModal