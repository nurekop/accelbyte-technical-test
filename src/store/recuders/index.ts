import { combineReducers } from "redux";
import activityReducer from "./activityReducer"


const reducers = combineReducers({
    activity: activityReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>