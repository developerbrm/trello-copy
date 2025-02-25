export type UiState = {
  data: unknown
  loading: boolean
  error: Error | null
}

export const createInitialState = (): UiState => ({
  data: [],
  loading: false,
  error: null,
})
