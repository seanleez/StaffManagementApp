import * as ActionType from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

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
        image: "../assets/images/HarryPotter.jpg",
    }
});

// fetchStaffs
export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true));

    return fetch(baseUrl + 'staffs')
        .then(response => response.json())
        .then(staffs => dispatch(addStaffs(staffs)))
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

// fetchDepartments
export const fetchDepartments = () => (dispatch) => {
    dispatch(departmentsLoading(true));

    return fetch(baseUrl + 'departments')
        .then(response => response.json())
        .then(departments => dispatch(addDepartments(departments)))
}

export const departmentsLoading = () => ({
    type: ActionType.DEPARTMENTS_LOADING
});

export const departmentsFailed = (errmess) => ({
    type: ActionType.DEPARTMENTS_FAILED,
    payload: errmess
})

export const addDepartments = (departments) => ({
    type: ActionType.ADD_DEPARTMENTS,
    payload: departments
})

// fetchStaffsSalary
export const fetchStaffsSalary = () => (dispatch) => {
    dispatch(staffsSalaryLoading(true));

    return fetch(baseUrl + 'staffsSalary')
        .then(response => response.json())
        .then(staffsSalary => dispatch(addStaffsSalary(staffsSalary)))
}

export const staffsSalaryLoading = () => ({
    type: ActionType.STAFFSSALARY_LOADING
});

export const staffsSalaryFailed = (errmess) => ({
    type: ActionType.STAFFSSALARY_FAILED,
    payload: errmess
})

export const addStaffsSalary = (staffsSalary) => ({
    type: ActionType.ADD_STAFFSSALARY,
    payload: staffsSalary
})