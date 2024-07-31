import { Activity } from "../types/types"

export type ActivityActions = 
{ type: 'save-activity', payload: {newActivity:Activity} } |
{ type: 'set-activeID', payload: {id:Activity['id']} }

export type ActivityState = {
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
            let updatedActivities : Activity[] = []
            if(state.activeID){
                updatedActivities = state.activities.map(act => act.id === state.activeID ? action.payload.newActivity : act)
            } else {
                updatedActivities = [...state.activities, action.payload.newActivity]
            }
            return {
                ...state, 
                activities: updatedActivities, 
                activeID: ''
            }
        case "set-activeID":
            return {
                ...state, 
                activeID: action.payload.id
            }
    }
    return state
}