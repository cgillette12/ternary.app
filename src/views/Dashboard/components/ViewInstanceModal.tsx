import { useState, useEffect } from 'react'
import { Modal, Button, Badge } from 'react-bootstrap';
interface IModal {
  isOpen: boolean;
  instance: any;
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
  } = instance
  useEffect(() => {
    const renderRecommendations = () => {
      const memorySize = memPresentage === 100 ? 'should increase size of Memory' : memPresentage < 100 && memPresentage >= 60 ? `Memory is properly size` : (memPresentage < 59 && memPresentage > 50) ? 'Memory could require services' : 'Decrease size of Memory';
      const cpuSize = cpuPresentage === 100 ? 'should increase size of CPU' : cpuPresentage < 100 && cpuPresentage >= 60 ? `CPU is properly size` : (cpuPresentage < 59 && cpuPresentage > 50) ? 'CPU could require services' : 'Decrease size of CPU';
      setMemRec(memorySize)
      setCpuRec(cpuSize)
    }
    renderRecommendations()
  },[cpuPresentage, memPresentage])



  return (
    <Modal
      show={isOpen}
      onHide={onModalClose}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className='w-100'>
          {id}
          <Badge bg='secondary ms-3'>{team}</Badge>
          <Badge bg='secondary ms-3'>{env}</Badge>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h5 className='mb-3'>Type:<Badge bg='secondary ms-3 me-2'>{type}</Badge>--{'>'}<Badge bg='success ms-2'>{type}</Badge> </h5>
        <div className='d-flex'>
          <div className='w-100 card p-3 mx-2'>
            <div className='d-flex justify-content-between' >
              <div className='font-600'>CPU Info:</div>
              <div>CPU: {cpus}</div>
              <div>Usage: {cpuUsage}</div>
              <div>% Used: {cpuPresentage}%</div>
            </div>
            <div className='d-flex mt-3 justify-content-end'>
              <div className='font-600 '>Recommendation: <span className='font-400'>{cpusRec}</span></div>
            </div>
          </div>
          <div className='w-100 card p-3 mx-2'>
            <div className='d-flex justify-content-between' >
              <div className='font-600'>Memory Info:</div>
              <div>Memory: {memory}</div>
              <div>Usage: {memUsage}</div>
              <div>% Used: {memPresentage}%</div>
            </div>
            <div className='d-flex justify-content-end mt-3'>
              <div className='font-600'>Recommendation: <span className='font-400'>{memRec}</span></div>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='primary' onClick={onModalClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewInstanceModal