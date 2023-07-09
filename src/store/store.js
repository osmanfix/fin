import { createStore } from "redux";
import {INFO_USER, 
    LOGIN_USER, 
    LOGOUT_USER, 
    RESET_RESULT, 
    RESULT_DOC, 
    RESULT_HISTOGRAM, 
    RESULT_ID, 
    SCREEN_SIZE, 
    SEARCH_DATA
} from "./types";
import {composeWithDevTools} from "@redux-devtools/extension";

const accAuth = JSON.parse(localStorage.getItem('user'))
const accInfo = JSON.parse(localStorage.getItem('user-info'))

const intitialState = {
    authenticated: accAuth !== null ? accAuth : null ,
    userInfo: accInfo !== null ? accInfo : null,
    screenSize: window.innerWidth,

};
const reducer = (state = intitialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state,
            authenticated: action.payload.accessToken ? action.payload : null
        }


        case LOGOUT_USER:
            localStorage.removeItem("user");
            localStorage.removeItem("user-info");
            return { ...state,
                authenticated: null,
                userInfo: null,
        }
        case INFO_USER:
            return { ...state,
            userInfo: action.payload
        }
        case SCREEN_SIZE:
            return { ...state,
            screenSize: action.payload
        }
        case SEARCH_DATA:
            return { ...state,
            searchData: action.payload
        }
        case RESULT_HISTOGRAM:
            return { ...state,
            resultHistogram: action.payload
        }
        case RESULT_ID:
            return { ...state,
            resultIDs: action.payload
        }
        case RESULT_DOC:
            return { ...state,
            resultDocs: state.resultDocs 
            ? state.resultDocs.concat(action.payload) 
            : action.payload
        }
        case RESET_RESULT:
            return { ...state,
                resultHistogram: null,
                resultDocs: null,
                resultIDs: null
            }


        default:
            return state;
    }
};

const store = createStore(reducer, composeWithDevTools());

export default store;