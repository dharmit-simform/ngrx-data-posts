export interface Post {
  _id?: string
  title: string
  body: string
  likes?: [string]
  genre?: string
  userInfo?: {
    name?: string
    username?: string
  }
  createdAt?: string
  updatedAt?: string
}
