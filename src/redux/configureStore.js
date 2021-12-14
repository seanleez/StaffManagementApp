import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Staffs } from './staffs';
import { Departments } from './departments';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialStaffInfor } from './form';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: Staffs,
            departments: Departments,
            ...createForms({
                staffinfor: InitialStaffInfor
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}