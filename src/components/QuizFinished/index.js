import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import { Button } from 'react-bootstrap';

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%'
})

const DataWrapper = styled.div({
  margin: '15px 0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
})

const Data = styled.h3({
  fontSize: '36px',
  weight: 'bold',
  letterSpacing: '0.1em',
})

const MainMessage = styled.h1({
  fontSize: '60px',
  color: '#ff94c5',
  fontWeight: 'bold',
  marginBottom: 40
})

const ButtonWrapper = styled.div({
  marginTop: 40
})

const QuizFinished = ({ totalSteps, numCorrect, resetQuiz }) => {
  const correctRate = Math.floor(numCorrect / totalSteps * 100)
  let mainMessage;
  if (correctRate === 100) {
    mainMessage = "すごい、全問正解！"
  } else if (correctRate >= 60) {
    mainMessage = "あぁ、惜しい！"
  } else {
    mainMessage = "うーん、もう少し！"
  }
  return (
    <Wrapper>
      <MainMessage>{mainMessage}</MainMessage>
      <DataWrapper>
        <Data>{totalSteps}問中、{numCorrect}問正解</Data>
      </DataWrapper>
      <DataWrapper>
        <Data>正答率{correctRate}%</Data>
      </DataWrapper>
      <ButtonWrapper>
        <Button onClick={resetQuiz} variant="outline-primary" size="lg">最初に戻る</Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

QuizFinished.propTypes = {
  totalSteps: PropTypes.number.isRequired,
  numCorrect: PropTypes.number.isRequired, 
  resetQuiz: PropTypes.func.isRequired
}

export default QuizFinished;