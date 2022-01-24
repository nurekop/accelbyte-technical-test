interface CommentInterface {
  idPhoto: number,
  comment: string
}

interface FavoriteIntervace {
  id: number,
  title: string,
  username: string,
  album: string,
  url: string,
  userId: number
}

interface DislikeIntervace {
  id: number
}

interface StateIntervace {
  favorites: any[];
  comments: any[];
}

export type Result = CommentInterface | FavoriteIntervace | StateIntervace;
export type Comment = CommentInterface;
export type Favorite = FavoriteIntervace;
export type Dislike = DislikeIntervace;
