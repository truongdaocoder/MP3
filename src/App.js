import { Route, Routes } from "react-router-dom";
import { Album, Home, Login, Public } from "./pages/public/index";
import path from "./ultis/path";
import * as action from "./store/action";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action.getHome());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path={path.public} element={<Public />}>
            <Route path={path.home} element={<Home />} />
            <Route path={path.login} element={<Login />} />
            <Route path={path.star} element={<Home />} />
            <Route path={path.PLAYLIST_TITLE_PID} element={<Album />} />
            <Route path={path.ALBUM_TITLE_PID} element={<Album />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}

export default App;
