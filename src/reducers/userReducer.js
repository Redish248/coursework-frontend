import {SIGN_IN, SIGN_OUT} from "../actions/actionTypes"

export function userReducer(state = {isAuthorised: false, nick: "", name: "", surname: "", sex: false, birthday: "", height: 120, weight: 40}, action) {
    switch (action.type) {
        case SIGN_IN:
            return {
                isAuthorised: true,
                nick: action.nick
            };
        case SIGN_OUT:
            return {
                isAuthorised: false
            };
        default:
            return {
                name: action.name,
                surname: action.surname,
                nick: action.nick,
                sex: action.sex,
                height: action.height,
                weight: action.weight,
                birthday: action.birthday,
                isAuthorised: true
            };
    }
}