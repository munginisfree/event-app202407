// 컴포넌트인데 실제 컴포넌트가 없는 경우에는 반드시
// redirect 코드가 필요
import {redirect} from "react-router-dom";

export const logoutAction = () => {
    localStorage.removeItem('userData');
    return redirect('/');
};