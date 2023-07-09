import store from "../store/store";
import { logoutUser } from "../store/types";

export function expireCheck (){

    const now = new Date()
    const auth = JSON.parse(localStorage.getItem('user'));

    if (auth && new Date(auth.expire) > now) {
        setTimeout(() => {
          store.dispatch(logoutUser())
        }, new Date(auth.expire) - now)
      } else {
        store.dispatch(logoutUser())
      }
}