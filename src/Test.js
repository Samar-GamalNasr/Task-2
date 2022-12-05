import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Row, Card } from "antd";

const Test = () => {
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
    <div className="site-card-wrapper">
        <Button onClick={addpost}>Add Post</Button>
        <Row gutter={16}>
      {posts.map((post) => (

          <Col offset={1} span={11}>
            <Card
              title="post"
              bordered={false}
              style={{ width: 300 }}
              key={post.id}
            >
              {post.title}
              <Button
                type="primary"
                danger
                block
                onClick={() => {
                  handleDelete(post);
                }}
              >
                Delete
              </Button>
            </Card>
          </Col>
        
      ))
    }
    </Row>
    </div>
  );
};
export default Test;
