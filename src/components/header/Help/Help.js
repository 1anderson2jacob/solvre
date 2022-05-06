import React from 'react';
import './Help.css';
import { ReactComponent as HelpSvg } from './HelpSvg.svg'
import { useState } from 'react';
import Modal from './Modal/Modal'

function Help() {
  const [isOpen, setIsOpen] = useState(false)

  const clickHandler = (e) => {
    e.preventDefault()
    setIsOpen(true)
  }
  return (
    <>
      <HelpSvg className="HelpSvg" onClick={clickHandler}></HelpSvg>
      {isOpen && <Modal setIsOpen={setIsOpen}></Modal>}
    </>
  )
}

export default Help