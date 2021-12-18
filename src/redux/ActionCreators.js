import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addStaff = (staff) => ({
    type: ActionTypes.ADD_STAFF,
    payload: staff
});

// POST
export const postStaff = (name, doB, salaryScale, startDate, departmentId, annualLeave, overTime) => (dispatch) => {
    const newStaff = {
        name: name,
        doB: new Date(doB).toISOString(),
        salaryScale: parseFloat(salaryScale),
        startDate: new Date(startDate).toISOString(),
        departmentId: departmentId,
        annualLeave: parseFloat(annualLeave),
        overTime: parseFloat(overTime),
        image: "/asset/images/alberto.png",
    }
    return fetch(baseUrl + 'staffs', {
        method: "POST",
        body: JSON.stringify(newStaff),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error' + response.status + ': '+ response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        dispatch(addStaffs(response));
        dispatch(addStaffsSalary(response));
    })
    .catch(error => {
        console.log('post Staff', error.message); 
        alert('Your staff could not be posted\nError: ' + error.message)
    });
}

// DELETE
export const fetchDelStaffs = (id) => (dispatch) => {
    return fetch(baseUrl + 'staffs/' + id, {
        method: 'DELETE',
        credentials: 'same-origin'
    })
        .then((response) => response.json())
        .then((staffs) => dispatch(delStaffs(staffs)))
}

export const delStaffs = (staffs) => ({
    type: ActionTypes.DELETE_STAFF,
    payload: staffs
})

// UPDATE
export const fetchUpdateStaffs = (id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime) => (dispatch) => {
    const updateStaffData = {
        id: id,
        name: name,
        doB: new Date(doB).toISOString(),
        salaryScale: parseFloat(salaryScale),
        startDate: new Date(startDate).toISOString(),
        departmentId: departmentId,
        annualLeave: parseFloat(annualLeave),
        overTime: parseFloat(overTime),
    }
    return fetch(baseUrl + 'staffs', {
        method: "PATCH",
        body: JSON.stringify(updateStaffData),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error' + response.status + ': '+ response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        dispatch(updateStaffs(response));
        dispatch(addStaffsSalary(response));
    })
    .catch(error => {
        console.log('Update Staff', error.message); 
        alert('Your staff could not be updated\nError: ' + error.message)
    });
}

export const updateStaffs = (staffs) => ({
    type: ActionTypes.UPDATE_STAFF,
    payload: staffs
})

// fetchStaffs
export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true));

    return fetch(baseUrl + 'staffs')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(staffs => dispatch(addStaffs(staffs)))
        .catch(error => dispatch(staffsFailed(error.message)))
}

export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
});

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
})

export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
})

// fetchDepartments
export const fetchDepartments = () => (dispatch) => {
    dispatch(departmentsLoading(true));

    return fetch(baseUrl + 'departments')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(departments => dispatch(addDepartments(departments)))
        .catch(error => dispatch(departmentsFailed(error.message)))
}

export const departmentsLoading = () => ({
    type: ActionTypes.DEPARTMENTS_LOADING
});

export const departmentsFailed = (errmess) => ({
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errmess
})

export const addDepartments = (departments) => ({
    type: ActionTypes.ADD_DEPARTMENTS,
    payload: departments
})

// fetchStaffsSalary
export const fetchStaffsSalary = () => (dispatch) => {
    dispatch(staffsSalaryLoading(true));

    return fetch(baseUrl + 'staffsSalary')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(staffsSalary => dispatch(addStaffsSalary(staffsSalary)))
        .catch(error => dispatch(staffsSalaryFailed(error.message)))
}

export const staffsSalaryLoading = () => ({
    type: ActionTypes.STAFFSSALARY_LOADING
});

export const staffsSalaryFailed = (errmess) => ({
    type: ActionTypes.STAFFSSALARY_FAILED,
    payload: errmess
})

export const addStaffsSalary = (staffsSalary) => ({
    type: ActionTypes.ADD_STAFFSSALARY,
    payload: staffsSalary
})