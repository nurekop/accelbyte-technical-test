import { ActionType } from '../action-types';
import { Dispatch } from 'redux';
import { Action } from "../interfaces/actionInterface"
import { Comment, Favorite } from "../interfaces/reducerInterface"

export const addComment = (comment: Comment) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.COMMENT,
      payload: comment
    });
  }
}

export const addFavorite = (favorite: Favorite) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.FAVORITE,
      payload: favorite
    });
  }
}

export const removeFavorite = (dislike: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.DISLIKE,
      payload: dislike
    });
  }
}