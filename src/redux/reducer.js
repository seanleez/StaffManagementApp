import { DEPARTMENTS } from '../shared/departments';
import { ROLES } from '../shared/roles';
import { STAFFS } from '../shared/staffs';

export const initialState = {
    departments: DEPARTMENTS,
    roles: ROLES,
    staffs: STAFFS
}

export const Reducer = (state = initialState, action) => {
    return state;
}