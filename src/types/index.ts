export interface InitialState {
  isLoading: boolean
  isLoginView: boolean
  error: string
  credentialsReg: {
    email: string
    password: string
  }
  credentialsLog: {
    username: string
    password: string
  }
}

export interface Action {
  type: string
  inputName: string
  payload: {}
}

export interface Profile {
  id: string
  nickName: string
  userPro: string
  created_at: string
  img: string
}

export interface EditedProfile {
  id: string
  nickName: string
}

export interface FriendRequest {
  askFrom: string
  askTo: string
  approved: boolean
}

export interface Cover {
  name: string | Blob
}
