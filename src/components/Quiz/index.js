/** @jsx jsx */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro';
import { jsx } from '@emotion/core';
import { Button } from 'react-bootstrap';
import { getAllQuizzes } from '../../lib/firebaseDb';
import { ReactComponent as Loader } from '../../images/loading.svg';
import QuizItemList from '../QuizItemList';

const Wrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
})

const QuizBox = styled.main({
  padding: 40,
  backgroundColor: '#faf7ff',
  border: '1px solid #B296F5',
  width: '100%',
  maxWidth: 900,
  height: 600,
  borderRadius: '10px',
})

const Centered = styled.div({
  height: '100%',
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})

export const EmptyQuiz = ({ sentence }) => (
  <Centered>
    <Loader height={60} width={60} />
    <p css={css`margin-top: 14px;`}>{sentence}</p>
  </Centered>
);

EmptyQuiz.propTypes = {
  sentence: PropTypes.string.isRequired
}

const BeforeStart = ({quiz, handleStart}) => (
  <Wrapper>
    <QuizBox>
      <Centered>
        <div css={css`
          text-align: center; 
          width: 70%;
        `}>
          <h2 css={css`margin-bottom: 0.5em;`}>{quiz.title}</h2>
          <p css={css`margin-bottom: 2em;`}>{quiz.description}</p>
          <Button 
            onClick={handleStart}
            variant="outline-primary" 
            size='lg'>クイズスタート</Button>
        </div>
      </Centered>
    </QuizBox>
  </Wrapper>
);

BeforeStart.propTypes = {
  quiz: PropTypes.object.isRequired,
  handleStart: PropTypes.func.isRequired,
}


export default class extends Component {
  state = {
    quizzes: null,
    chosenQuizId: null,
    status: 'beforeStart',
    loading: true
  }

  async componentDidMount() {
    const quizzes = {};
    const snapshot = await getAllQuizzes();
    snapshot.forEach(doc => {
      quizzes[doc.id] = doc.data();
    })
    const chosenQuizId = Object.keys(quizzes)[0];
    this.setState({
      chosenQuizId,
      quizzes,
      loading: false
    })
  }

  startQuiz = (e) => {
    e.preventDefault();
    this.setState({
      status: 'started'
    })
  }

  resetQuiz = () => {
    this.setState({
      status: 'beforeStart'
    })
  }

  render() {
    const { 
      loading, 
      quizzes, 
      chosenQuizId, 
      status 
    } = this.state;
    if (loading) return (
      <Wrapper>
        <QuizBox>
          <EmptyQuiz sentence="クイズを読み込んでいます。" />
        </QuizBox>
      </Wrapper>
    );
    const chosenQuiz = quizzes[chosenQuizId];
    if (status === 'beforeStart') {
      return (
        <BeforeStart 
          handleStart={this.startQuiz}
          quiz={chosenQuiz} />
      );
    }
    if (status === 'started') {
      return (
        <Wrapper>
          <QuizBox>
            <QuizItemList 
              resetQuiz={this.resetQuiz}
              quizId={chosenQuizId}
              quiz={chosenQuiz} />
          </QuizBox>
        </Wrapper>
      );
    }
  }
}