import './Help.css';
import { ReactComponent as HelpSvg} from './HelpSvg.svg'

function Help() {

  const clickHandler = (e) => {
    console.log('clicked')
  }
  return (
    <HelpSvg className="HelpSvg" onClick={clickHandler}></HelpSvg>
  )
}

export default Help