import { atom } from "recoil";

export const User = atom({
    key: "User",
    default: {
        id : "",
        email: "",
        username: "",
        name: "",
        is_verified: false,
    },
})

export const SessionsState = atom({
    key: "Sessions",
    default: [],
})