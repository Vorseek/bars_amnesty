import styled from "styled-components";
import React from "react";
import Snowflakes from "magic-snowflakes";
import Bars from "./bars.jpg";
import Star from "./Pixi/Star";
import "./App.css";

const ValueBlock = React.memo(({ value, title }) => (
  <TimeBlock>
    <div>{value}</div>
    <div>{title}</div>
  </TimeBlock>
));

let interval;
const windowInnerWidth = window.innerWidth;
const windowInnerHeight = window.innerHeight;

function App() {
  const [date, setDate] = React.useState({});
  const [happyEnd, setHappyEnd] = React.useState("");

  React.useEffect(() => {
    if (happyEnd === "stars") {
      document.getElementById("star").appendChild(Star.view);
      setTimeout(() => {
        document.querySelector("canvas").remove();
        setHappyEnd("video");
      }, 10000);
    }
  }, [happyEnd]);

  React.useEffect(() => {
    if (date.valueSec < 0 && !happyEnd) {
      setHappyEnd("stars");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  React.useEffect(() => {
    const snowflakes = new Snowflakes({ count: 100, speed: 1.5 });

    interval = setInterval(() => {
      const currentDay = new Date();
      const finallyDay = new Date("2021-12-10T18:00:00");
      const msDate = finallyDay - currentDay;
      const valueDay = Math.floor(msDate / (1000 * 60 * 60 * 24));
      const valueHours = Math.floor((msDate / (1000 * 60 * 60)) % 24);
      const valueMinute = Math.floor((msDate / (1000 * 60)) % 60);
      const valueSec = Math.floor((msDate / 1000) % 60);
      const valueMs = Math.floor(msDate % 1000);

      setDate({ valueDay, valueHours, valueMinute, valueSec, valueMs });
    }, 250);

    return () => {
      snowflakes.destroy();
      clearInterval(interval);
    };
  }, []);

  return (
    <PageWrapper className="App">
      <div id="star">
        {happyEnd === "video" && (
          <>
            <button
              onClick={() => {
                setHappyEnd("end");
              }}
              className="button"
            >
              X
            </button>
            <iframe
              id="video"
              width={windowInnerWidth}
              height={windowInnerHeight}
              src="https://www.youtube.com/embed/Gm8UYntIb0o?autoplay=1&mute=1"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </>
        )}
      </div>

      <h4>Осталось</h4>
      <TimeWrapp>
        <ValueBlock value={date.valueDay} title="Days" />
        <ValueBlock value={date.valueHours} title="Hours" />
        <ValueBlock value={date.valueMinute} title="Minutes" />
        <ValueBlock value={date.valueSec} title="Seconds" />
        <ValueBlock value={date.valueMs} title="Ms" />
      </TimeWrapp>
      {date.valueSec < 0 && <img src={Bars} alt="bars" />}
    </PageWrapper>
  );
}

export default App;

const PageWrapper = styled.div`
  min-height: calc(100vh - 100px);
  font-size: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #d3fdfd;
  padding: 50px;

  h4 {
    margin: 30px;
  }

  img {
    margin-top: 20px;
  }

  .button {
    position: absolute;
    top: 0;
    right: 0;
    background-color: red;
    width: 50px;
    height: 50px;
  }

  #star {
    position: fixed;
  }
`;

const TimeWrapp = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  flex-wrap: wrap;
`;

const TimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  min-width: 107px;

  background-color: #b1e5f8;
  border-radius: 20px;

  div:first-child {
    font-size: 50px;
    border-radius: 20px;
    background-color: #80ddff;
    font-weight: bold;
  }
  div:last-child {
    font-size: 50px;
  }
`;
