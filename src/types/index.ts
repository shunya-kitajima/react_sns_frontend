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
  id: number | null
  nickName: string
  userPro: number | null
  created_at: string
  img: string
}

export interface EditedProfile {
  id: number | null
  nickName: string
}

export interface FriendRequest {
  id: number | null
  askFrom: number | null
  askTo: number | null
  approved: boolean
}

export interface Cover {
  imgFile: File
}

export interface DM {
  sender: number | null
  receiver: number | null
  message: string
}
