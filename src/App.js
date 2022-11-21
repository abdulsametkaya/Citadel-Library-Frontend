import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { getUser } from "./api/user-service";
import Loading from "./components/common/loading/loading";
import ScrollTop from "./components/common/scroll-button/scroll-top";
import CustomRoutes from "./router/custom-routes";
import { loginFailed, loginSuccess } from "./store/slices/auth-slice";
import { settings } from "./utils/settings";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      let token = secureLocalStorage.getItem("token");
      if (token) {
        const resp = await getUser();
        dispatch(loginSuccess(resp.data));
      }
    } catch (err) {
      console.log(err);
      dispatch(loginFailed());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    document.title = `${settings.siteName} | For all your needs`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <CustomRoutes />
          <ScrollTop />
        </>
      )}
    </>
  );
}

export default App;
