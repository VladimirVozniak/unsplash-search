import {CircularProgress} from "@mui/material";
import './style.css'

function Loader({ isLoading }) {

  if(!isLoading) {
    return null
  }

  return <div className={'loader'}>
    <CircularProgress />
  </div>

}

export default Loader