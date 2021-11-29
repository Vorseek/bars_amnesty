import styled from "styled-components";
import './App.css';

function App() {
    const currentDay = new Date();
    const finallyDay = new Date("2021-12-10T10:00:00");
    const value = Math.floor((finallyDay - currentDay) / (1000 * 60 * 60 * 24));


  return (
    <PageWrapper className="App">
      <PageTitle>Осталось {value} дней</PageTitle>
    </PageWrapper>
  );
}

export default App;

const PageTitle = styled.h1`
  font-size: 70px;
`;

const PageWrapper = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;