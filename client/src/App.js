import Header from "./conponent/header/Header";
import Main from "./conponent/main/Main";
import LabelChangePopup from "./conponent/main/labelChangePopup/LabelChangePopup";
import {useSelector} from "react-redux";
import PopupBigCard from "./conponent/popupBigCard/PopupBigCard";

function App() {
    const isActiveLabelPopup=useSelector(state => state.labelPopupSlice.isActive)
    const isActiveCardBig=useSelector(state => state.isBigCard.isActive)



  return (
    <div className="App">
        {isActiveLabelPopup && <LabelChangePopup />}
        {isActiveCardBig && <PopupBigCard />}
        <Header/>
        <Main/>
    </div>
  );
}

export default App;
