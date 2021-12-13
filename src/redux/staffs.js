import * as ActionType from './ActionTypes'
import { STAFFS } from '../shared/staffs';

export const Staffs = (state = STAFFS, action) => {
    switch (action.type) {
        case ActionType.ADD_STAFF:
            var staff = action.payload;
            staff.id = state.length;
            console.log(staff);
            return state.concat(staff);
        default:
            return state;
    }
}