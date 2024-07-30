import { Activity } from "../types/types"

export type ActivityActions = 
{ type: 'save-activity', payload: {newActivity:Activity} } |
{ type: 'set-activeID', payload: {id:Activity['id']} }

type ActivityState = {
    activities: Activity[],
    activeID: Activity['id']
}

export const initialState: ActivityState = {
    activities: [],
    activeID: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    switch (action.type){
        case 'save-activity':
            return {
                ...state, activities: [...state.activities, action.payload.newActivity]
            }
        case "set-activeID":
            return {
                ...state, activeID: action.payload.id
            }
    }
    return state
}