import {SIGN_IN, SIGN_OUT, SIGN_UP_1, SIGN_UP_2} from "../actions/actionTypes"

export function userReducer(state = {isAuthorised: false, nick: "", name: "", surname: "", sex: false, birthday: "", height: 120, weight: 40, file: ""}, action) {
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
        case SIGN_UP_1:
            return {
                name: action.name,
                surname: action.surname
            };
        case SIGN_UP_2:
            return {
                name: state.name,
                surname: state.surname,
                sex: action.sex,
                height: action.height,
                weight: action.weight,
                birthday: action.birthday,
                file: action.file
            };
        default:
            return {
                name: state.name,
                surname: state.surname,
                sex: state.sex,
                height: state.height,
                weight: state.weight,
                birthday: state.birthday,
                nick: action.nick,
                file: action.file,
                isAuthorised: true
            };
    }
}