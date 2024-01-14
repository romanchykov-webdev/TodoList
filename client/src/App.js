import Header from "./conponent/header/Header";
import Main from "./conponent/main/Main";
import LabelChangePopup from "./conponent/main/labelChangePopup/LabelChangePopup";
import {useSelector} from "react-redux";

function App() {
    const isActiveLabelPopup=useSelector(state => state.labelPopupSlice.isActive)





  return (
    <div className="App">
        {isActiveLabelPopup && <LabelChangePopup />}
        <Header/>
        <Main/>
    </div>
  );
}

export default App;
