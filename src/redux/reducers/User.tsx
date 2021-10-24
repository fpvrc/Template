const initialState = {
  user: null,
};

export default function userReducer(
  state = initialState,
  action: {type: string; payload: any},
) {
  switch (action.type) {
    default:
      return state;
  }
}
