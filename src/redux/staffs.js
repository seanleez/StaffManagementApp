import * as ActionType from './ActionTypes'

export const Staffs = (state = {
        isLoading: true,
        errMess: null,
        staffs: []
    }, action) => {
        switch (action.type) {
            case ActionType.ADD_STAFF:
                var staff = action.payload;
                staff.id = state.staffs.length;
                return {...state, isLoading: false, errMess: null, staffs: state.staffs.concat(staff)}

            case ActionType.ADD_STAFFS:
                return {...state, isLoading: false, errMess: null, staffs: action.payload}
                
            case ActionType.STAFFS_LOADING:
                return {...state, isLoading: true, errMess: null, staffs: []}

            case ActionType.STAFFS_FAILED:
                return {...state, isLoading: false, errMess: action.payload}

            default:
                return state;
        }
}