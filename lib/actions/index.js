
export const setCurrentUser = (user) => {
    return {
        type: "SET_CURRENT_USER", payload: user
    }
}
export const setUserProfile = (data) => {
    return {
        type: "SET_USER_PROFILE", payload: data
    }
}