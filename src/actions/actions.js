import {SIGN_IN, SIGN_OUT, SIGN_UP_1, SIGN_UP_2, SIGN_UP_3} from "./actionTypes"

export const signUp1 = (name, surname ) => ({
    type: SIGN_UP_1,
    name: name,
    surname: surname,
});

export const signUp2 = (sex, height, weight, birthday) => ({
    type: SIGN_UP_2,
    sex: sex,
    height: height,
    weight: weight,
    birthday: birthday,
});

export const signUp3 = (nick) => ({
    type: SIGN_UP_3,
    isAuthorised: true,
    nick: nick,
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


