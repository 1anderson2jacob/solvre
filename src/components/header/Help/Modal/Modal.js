import './Modal.css'
import { ReactComponent as CloseBtnSvg } from './CloseBtnSvg.svg'
import Examples from './Examples/Examples'

function Modal ({ setIsOpen }) {
  return (
    <>
      <div className="Modal" onClick={() => setIsOpen(false)}>
        <div className="content">
          <CloseBtnSvg className="CloseBtnSvg"></CloseBtnSvg>
          <section>
            <div className="instructions">
              <h1>Instructions</h1>
              <p>Solvre is a web app that was made to solve <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank" rel="noopener noreferrer">Wordle</a></p>
              <p>
                Input your guesses as they are shown in Wordle
              </p>
              <p>
                Next, click each correct letter to change their color to denote correct or incorrect positions
              </p>
              <p>
                When your Solvre board matches your Wordle board, press SUBMIT to see all possible solutions
              </p>
            </div>
            <hr></hr>
            <Examples></Examples>
          </section>
        </div>
      </div>

    </>
  )
}

export default Modal