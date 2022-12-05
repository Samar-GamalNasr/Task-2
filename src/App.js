import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button ,Col} from 'antd';

const App = () => {
  const [posts, setPost] = useState([]);

  const dataLink = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    const getPost = async () => {
      const { data: res } = await axios.get(dataLink);
      setPost(res);
    };
    getPost();
  }, []);

  const addpost = async () => {
    const post = {
      title: "Hi you add new post",
      body: "new",
      id: `${Math.random().toString(16).slice(2)}`,
    };
    await axios.post(dataLink, post);
    setPost([post, ...posts]);
  };

  const handleDelete = async (post) => {
    await axios.delete(dataLink + "/" + post.id + post);
    setPost(posts.filter((p) => p.id !== post.id));
  };

  return (
    <>
        <h1>Task 2</h1>
        <Col span={8} offset={8}>
        <Button type="dashed"   onClick={addpost}>Update</Button>
      </Col>
        <table>
          <thead>
            <tr>
              <th>Posts</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <Button
                  type="primary" danger
                    onClick={() => {
                      handleDelete(post);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  );
};
export default App;
