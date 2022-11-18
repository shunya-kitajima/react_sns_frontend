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
