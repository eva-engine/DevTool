import React from "react";
import ReactDOM from "react-dom";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
// import "./index.css";
import SearchTree from "./SearchTree";
import Tables from "./Tables";

class Demo extends React.Component {
  state = {
    value: undefined,
    obj: [
      {
        "position.x": "0",
        "position.y": "0",
        name: "Transform"
      },
      {
        "position.x": "0",
        "position.y": "0",
        name: "ninePatch"
      }
    ]
  };

  onChange = (value) => {
    console.log(value);
    this.setState({ value });
  };

  render() {
    return (
      <>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <SearchTree />
          </Col>
          <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
          <Col xs={11} sm={11} md={11} lg={11} xl={11}>
            <Tables className="tables" arr={this.state.obj} objId={1} />
          </Col>
        </Row>
      </>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById("root"));
