import { Activity } from "../types/types"

export type ActivityActions = 
{ type: 'save-activity', payload: {newActivity:Activity} } |
{ type: 'set-activeID', payload: {id:Activity['id']} } |
{ type: 'delete-activity', payload: {id:Activity['id']} } |
{ type: 'restart-app'}

export type ActivityState = {
    activities: Activity[],
    activeID: Activity['id']
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
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
        case "delete-activity":
            return {
                ...state,
                activities: state.activities.filter(act => act.id !== action.payload.id)
            }
        case "restart-app":
            return {
                activities: [],
                activeID: ''
            }
    }
    return state
}