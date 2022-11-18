export interface InitialState {
  isLoading: boolean
  isLoginView: boolean
  error: string
  credentialsReg: Record<string, string>
  credentialsLog: Record<string, string>
}

export interface Action {
  type: string
  inputName: string
  payload: {}
}
