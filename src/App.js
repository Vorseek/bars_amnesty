import styled from "styled-components";
import React from "react";
import Snowflakes from 'magic-snowflakes';
import './App.css';

const ValueBlock = React.memo(({value, title}) => (
 <TimeBlock ><div>{value}</div><div>{title}</div></TimeBlock>
));

let interval;

function App() {
    const [date, setDate] = React.useState({});

    interval = setInterval(() => {
        const currentDay = new Date();
        const finallyDay = new Date("2021-12-10T18:00:00");
        const msDate = finallyDay - currentDay;
        const valueDay = Math.floor(msDate / (1000 * 60 * 60 * 24));
        const valueHours = Math.floor((msDate / (1000 * 60 * 60) % 24));
        const valueMinute = Math.floor((msDate / (1000 * 60)) % 60);
        const valueSec = Math.floor((msDate / 1000) % 60);
        const valueMs = Math.floor(msDate % 1000);

        setDate({valueDay, valueHours, valueMinute, valueSec, valueMs});
    }, 250)

    React.useEffect(() => {
        const snowflakes = new Snowflakes({ count: 100, speed: 1.5 });
        snowflakes.start();

        return () => {
            snowflakes.destroy();
            clearInterval(interval);
        }
    }, []);



    return (
    <PageWrapper className="App">
        <h4>Осталось</h4>
        <TimeWrapp>
            <ValueBlock value={date.valueDay} title="Days" />
            <ValueBlock value={date.valueHours} title="Hours" />
            <ValueBlock value={date.valueMinute} title="Minutes" />
            <ValueBlock value={date.valueSec} title="Seconds" />
            <ValueBlock value={date.valueMs} title="Ms" />
        </TimeWrapp>
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