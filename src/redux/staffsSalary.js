import * as ActionType from './ActionTypes'

export const StaffsSalary = (state = {
        isLoading: true,
        errMess: null,
        staffsSalary: []
    }, action) => {
        switch (action.type) {
            case ActionType.ADD_STAFFSSALARY:
                return {...state, isLoading: false, errMess: null, staffsSalary: action.payload}
                
            case ActionType.STAFFSSALARY_LOADING:
                return {...state, isLoading: true, errMess: null, staffsSalary: []}

            case ActionType.STAFFSSALARY_FAILED:
                return {...state, isLoading: false, errMess: action.payload}

            default:
                return state;
        }
}