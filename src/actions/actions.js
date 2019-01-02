import {SIGN_IN, SIGN_OUT, SIGN_UP} from "./actionTypes"

export const signUp = (name, surname, nick, sex, height, weight, birthday ) => ({
    type: SIGN_UP,
    name: name,
    surname: surname,
    nick: nick,
    sex: sex,
    height: height,
    weight: weight,
    birthday: birthday,
    isAuthorised: true
});

export const signOut = () => ({
    type: SIGN_OUT,
    isAuthorised: false,
    nick: '',
});

export const signIn = (nick) => ({
    type: SIGN_IN,
    nick: nick,
    isAuthorised: true
});

