const initState = { posts: [{}], count: 0 }
// eslint-disable-next-line no-unused-vars
export default (state = initState, action) => {
	switch (action.type) {
		case 'ADD_POST':
			return { posts: [...state.posts, action.payload.posts], count: action.payload.count };
		default:
			return initState;
	}
}