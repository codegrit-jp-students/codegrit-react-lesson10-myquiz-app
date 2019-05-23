import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ProgressBar, Button } from 'react-bootstrap';
import styled from '@emotion/styled/macro';
import { EmptyQuiz } from '../Quiz';
import { getAllQuizItems, getAllQuizOptions } from '../../lib/firebaseDb';
import QuizItem from '../QuizItem';
import QuizFinished from '../QuizFinished';

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

const ButtonsWrapper = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
})

export default class extends Component {

  static propTypes = {
    quizId: PropTypes.string.isRequired,
    resetQuiz: PropTypes.func
  }

  state = {
    quizItems: [],
    answers: [],
    preparing: true,
    step: 0,
    totalSteps: 0,
    numCorrect: 0,
    finished: false,
  }

  async componentDidMount() {
    const { quizId } = this.props
    const snapshot = await getAllQuizItems(quizId);
    const quizItems = snapshot.docs
    this.setState({
      quizItems,
      totalSteps: quizItems.length,
      answers: new Array(quizItems.length),
      preparing: false
    })
  }

  getOptionsSnapshots = async (quizItemSnapshot, quizId) => {
    const optionsSnapshots = []
    await quizItemSnapshot.forEach(data => {
      getAllQuizOptions(quizId, data.id)
      .then((snapshot) => {
        optionsSnapshots.push(snapshot)
      })
    })
    return optionsSnapshots
  }

  handleChooseAnser(slug, e) {
    let { answers, step } = this.state;
    answers[step] = slug
    this.setState({
      answers
    })
  }

  stepBack = (e) => {
    e.preventDefault();
    this.setState(state => ({
      step: state.step - 1
    }))
  }

  stepNext = (e) => {
    e.preventDefault();
    this.setState(state => ({
      step: state.step + 1
    }))
  }

  finalize = (e) => {
    e.preventDefault();
    const { answers, quizItems } = this.state;
    let numCorrect = 0;
    answers.forEach((a, i) => {
      const correctSlug = quizItems[i].data().answer_slug;
      if (a === correctSlug) numCorrect++;
    })
    this.setState(state => ({
      numCorrect,
      finished: true,
      step: state.step + 1
    }))
  }

  handleUpdateAnswer = (slug, e=null) => {
    if (e) e.preventDefault();
    let { answers, step} = this.state;
    answers[step] = slug
    this.setState({
      answers
    })
  }

  resetQuiz = (e) => {
    e.preventDefault();
    this.setState({
      quizItems: [],
      answers: [],
      preparing: true,
      step: 0,
      totalSteps: 0,
      numCorrect: 0,
      finished: false,
    })
    this.props.resetQuiz();
  }

  render() {
    const { quizId } = this.props;
    const { 
      preparing, 
      step, 
      totalSteps,
      quizItems,
      answers,
      finished,
      numCorrect,
    } = this.state;
    const answer = answers[step];
    if (preparing) return <EmptyQuiz sentence="準備しています" />
    let preButton = <Button disabled={true} variant="outline-secondary">戻る</Button>
    if (finished && step === totalSteps) {
      return (
        <QuizFinished 
          resetQuiz={this.resetQuiz}
          totalSteps={totalSteps} 
          numCorrect={numCorrect} />
      );
    }
    if (step !== 0) preButton = (
      <Button onClick={this.stepBack} 
        variant="outline-secondary">戻る</Button>
    );
    let nextButton;
    if (step + 1 === totalSteps) {
      const isDisabled = !!(typeof answer === 'undefined')
      nextButton = <Button 
        onClick={this.finalize}
        disabled={isDisabled}
        variant="outline-primary">結果を見る</Button>
    } else {
      const isDisabled = !!(typeof answer === 'undefined')
      nextButton = <Button 
        onClick={this.stepNext}
        disabled={isDisabled} 
        variant="outline-primary">次へ</Button>
    }
    const percentage = Math.round(step / totalSteps * 100)
    return (
      <Wrapper>
        <ProgressBar now={percentage} striped variant="primary" />
        <QuizItem 
          selectOption={this.handleUpdateAnswer}
          answer={answer}
          quizId={quizId}
          step={step} 
          itemId={quizItems[step].id}
          item={quizItems[step].data()} />
        <ButtonsWrapper>
          {preButton}
          {nextButton}
        </ButtonsWrapper>
      </Wrapper>
    );
  }

}