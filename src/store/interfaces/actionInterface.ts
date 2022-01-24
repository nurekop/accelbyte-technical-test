import { ActionType } from "../action-types"

interface FavoriteAction {
    type: ActionType.FAVORITE,
    payload: {
      id: number,
      title: string,
      username: string,
      album: string
    }
}

interface DislikeAction {
    type: ActionType.DISLIKE,
    payload: number
}

interface CommentAction {
    type: ActionType.COMMENT,
    payload: {
      idPhoto: number,
      comment: string
    }
}

export type Action = FavoriteAction | CommentAction | DislikeAction;