import * as ActionType from './ActionTypes';
import { STAFFS } from '../shared/staffs';

export const addStaff = (id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image) => ({
    type: ActionType.ADD_STAFF,
    payload: {
        id: id,
        name: name,
        doB: doB,
        salaryScale: salaryScale,
        startDate: startDate,
        department: departmentId,
        annualLeave: annualLeave,
        overTime: overTime,
        image: "assets/images/HarryPotter.jpg",
    }
});

export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true));

    setTimeout(() => {
        dispatch(addStaffs(STAFFS));
    }, 2000)
}

export const staffsLoading = () => ({
    type: ActionType.STAFFS_LOADING
});

export const staffsFailed = (errmess) => ({
    type: ActionType.STAFFS_FAILED,
    payload: errmess
})

export const addStaffs = (staffs) => ({
    type: ActionType.ADD_STAFFS,
    payload: staffs
})