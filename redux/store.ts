import { configureStore } from '@reduxjs/toolkit'

// import {adminReducer} from "./reducer/admin"
// import {coursesReducer} from "./reducer/course"
// import {goalsReducer} from "./reducer/goal"

import { userReducer } from './reducer/user'

export const store = configureStore({
    reducer: {
        // admin: adminReducer,
        // goal: goalsReducer,
        // course: coursesReducer
        user: userReducer,
    }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch