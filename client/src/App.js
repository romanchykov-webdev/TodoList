import Header from "./conponent/header/Header";
import Main from "./conponent/main/Main";
import LabelChangePopup from "./conponent/main/labelChangePopup/LabelChangePopup";
import {useSelector} from "react-redux";
import PopupBigCard from "./conponent/popupBigCard/PopupBigCard";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Error404 from "./conponent/authRegis/Error404";
import Login from "./conponent/authRegis/Login";
import Registration from "./conponent/authRegis/Registration";

function App() {
    const isActiveLabelPopup = useSelector(state => state.labelPopupSlice.isActive)
    const isActiveCardBig = useSelector(state => state.isBigCard.isActive)
    const isAuth = useSelector(state => state.userSlice.isAuth)

    return (
        <div className="App">
            <Header/>
        <Routes>
            {!isAuth ? (
                <>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<Login/>}/>
                </>
            ) : (
                <Route path="/*" element={
                    <>
                        {isActiveLabelPopup && <LabelChangePopup/>}
                        {isActiveCardBig && <PopupBigCard/>}
                        <Main/>
                    </>
                }/>
            )}
            <Route path="*" element={<Error404/>}/>
        </Routes>
        </div>
    );
}

export default App;


// <div className="App">
//     {isActiveLabelPopup && <LabelChangePopup/>}
//     {isActiveCardBig && <PopupBigCard/>}
//     <Header/>
//     <Main/>
// </div>