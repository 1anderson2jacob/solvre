import './Help.css';
import { ReactComponent as HelpSvg } from './HelpSvg.svg'
import { useState, useEffect } from 'react';
import Modal from './Modal/Modal'

function Help() {
  const [isOpen, setIsOpen] = useState(false)

  const clickHandler = (e) => {
    e.preventDefault()
    setIsOpen(true)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isOpen])

  return (
    <>
      <HelpSvg className="HelpSvg" onClick={clickHandler}></HelpSvg>
      {isOpen && <Modal setIsOpen={setIsOpen}></Modal>}
    </>
  )
}

export default Help