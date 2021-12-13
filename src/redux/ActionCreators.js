import * as ActionType from './ActionTypes';

export const addStaff = (name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image) => ({
    type: ActionType.ADD_STAFF,
    payload: {
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