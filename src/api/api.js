const getPosts = async (page) => {
	const res = await fetch(`http://localhost:3000/posts?_page=${page}`)
	const posts = await res.json();
	return posts;
}


const addPosts = async (post) => {
	const res = await fetch('http://localhost:3000/posts', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(post) },)
	const posts = await res.json();
	return posts;
}

const getTags = async () => {
	const res = await fetch('http://localhost:3000/tags');
	const tags = await res.json();
	return tags
}

const getPostCount = async () => {
	const res = await fetch('http://localhost:3000/posts');
	const posts = await res.json();
	return posts.length;
}
export { getPosts, addPosts, getTags, getPostCount }