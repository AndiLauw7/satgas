/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Card } from "react-bootstrap";

const ContentDashboard = () => {
  const user = localStorage.getItem("userSession");
  const parseUser = JSON.parse(user);

  return (
    <div className="container-fluid">
      <Card.Text className="text-end fw-bold">
        Welcome {parseUser.username}
      </Card.Text>
    </div>
  );
};

export default ContentDashboard;
