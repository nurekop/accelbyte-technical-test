import { ActionType } from "../action-types"
import { Action } from "../interfaces/actionInterface"
import { Result } from "../interfaces/reducerInterface"

const initialState = {
  favorites: [],
  comments: []
};

const reducer = (state = initialState, action: Action): Result => {
    switch (action.type){
        case ActionType.FAVORITE:
            return {
                ...state,
                favorites : [
                    ...state.favorites,
                    action.payload
                ]
            };
        case ActionType.DISLIKE:
            const filterFavorite = state.favorites.filter(favorite => {
                return favorite['id'] !== action.payload
            })
            return {
                ...state,
                favorites : [
                    ...filterFavorite
                ]
            };
        case ActionType.COMMENT:
            return {
                ...state,
                comments : [
                    ...state.comments,
                    action.payload
                ]
            }
        default:
            return state
    }
}

export default reducer