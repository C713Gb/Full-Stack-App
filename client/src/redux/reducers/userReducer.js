import { Types } from "../constants/action-types"


const initialState = {
    user: null,
    formSubmitted: false
}

export const userReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case Types.LOGIN:
            return {
                ...state,
                user: payload,
                formSubmitted: false
            };
        default:
            return state;
    }
}