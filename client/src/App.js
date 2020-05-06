import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios"


function App() {
const deletePost = (e, postId) => {
  e.preventDefault()
  axios
  .delete(`http://localhost:8000/api/posts/${postId}`)
  .then(res => getPosts())
  //deletes and then update list
  .catch(err => console.log(err))
}

 const getPosts = () => {
  axios.get("http://localhost:8000/api/posts")
  .then(res => setPosts(res.data))
  .catch(err => console.log(err))
 }

const [posts, setPosts] = useState()

useEffect(() => {
  getPosts()
}, [])

const emptyForm = {
  title: "",
  contents: "",
}

const [formState, setFormState] = useState(emptyForm);
  
const handleSubmit = (e) => {
  e.preventDefault();
  axios
  .post("http://localhost:8000/api/posts", formState)
  .then(res => getPosts())
  .catch(err => console.log(err))
  setFormState(emptyForm);
};

const handleChange = (e) => {
  e.persist();
  setFormState((previous) => ({
    ...previous,
    [e.target.name]: e.target.value,
  }));
};


  return (
    <div className="App">
      {posts && posts.map(post => <> <p>{post.title}</p> <p>{post.contents}</p> <button onClick={e => deletePost(e, post.id) }>Delete Post</button> </>)}
    <form>
    <label htmlFor="title">
          <input
            id="title"
            type="text"
            name="title"
            value={formState.title}
            onChange={handleChange}
            placeholder="Title"
          />
        </label>
        <label htmlFor="contents">
          <input
            id="contents"
            type="text"
            name="contents"
            value={formState.contents}
            onChange={handleChange}
            placeholder="Add Something"
          />
        </label>
      <button onClick={handleSubmit}>Add Post</button>
    </form>
    </div>
  );
}

export default App;
