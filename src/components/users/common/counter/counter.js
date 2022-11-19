import React from "react";
import { Container } from "react-bootstrap";
import CountUp from "react-countup";
import "./counter.scss";

const Counter = (props) => {
  const {start, end, text } = props;
  return (
    <Container>
      <div className="counter">
        <CountUp
          start={start}
          end={end}
          duration={3}
          separator=""
          suffix=""
          scrollSpyDelay={1000}
          onEnd={() => console.log("Ended! 👏")}
          onStart={() => console.log("Started! 💨")}
        >
          {({ countUpRef }) => (
            <div>
              <span ref={countUpRef} className="counter-number" />
              <div className="counter-bottom"></div>
              <h5 className="counter-text"><br/>{text}</h5>
            </div>
          )}
        </CountUp>
      </div>
    </Container>
  );
};

export default Counter;
