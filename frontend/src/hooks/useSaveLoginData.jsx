import { useDispatch, useNavigate, useTranslation } from "../shared/hooks";
import { toast } from "../shared/constants";
import { userActions } from "../Store/userInfo-slice";
import { saveRoleState, saveTokenState } from "../Store/userInfo-actions";

const useSaveLoginData = () => {
  const dispatch = useDispatch();
  const { t: key } = useTranslation();
  const navigate = useNavigate();
  const notifySuccess = (message) => toast.success(message);

  const saveDataIntoRedux = (res) => {
    const role = res?.data?.user?.role;
    const user = res?.data?.user;
    const token = res?.token;
    dispatch(userActions.setUserInfo(user));
    dispatch(userActions.setRole(role));
    dispatch(userActions.setToken(token));
    dispatch(saveTokenState(token));
    dispatch(saveRoleState(role));
    notifySuccess(key("logged"));
    if (role !== "admin") {
      navigate("/properties");
    } else {
      navigate("/admin-dashboard");
    }
  };

  return saveDataIntoRedux;
};

export default useSaveLoginData;
