/** @jsx jsx */
import { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro';
import { jsx } from '@emotion/core'
import { getAllQuizOptions } from '../../lib/firebaseDb';
import QuizOption from '../QuizOption';

const MainWrapper = styled.div({
  margin: '30px 0'
})

export default class extends Component {

  static propTypes = {
    itemId: PropTypes.string.isRequired,
    quizId: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    answer: PropTypes.string,
    selectOption: PropTypes.func.isRequired
  }

  state = {
    options: [],
    loading: true,
  }

  async componentDidMount() {
    this.loadDataAndSet();
  }

  async componentDidUpdate(prevProps, prevState) {
    const { itemId } = this.props;
    if (prevProps.itemId !== itemId) {
      this.setState({
        options: [],
        loading: true,
      })
      this.loadDataAndSet();
    }
  }

  loadDataAndSet = async () => {
    const { quizId, itemId } = this.props;
    const snapshot = await getAllQuizOptions(quizId, itemId);
    const options = snapshot.docs;
    this.setState({
      options,
      loading: false,
    })
  }

  render() {
    const { step, item, answer, selectOption } = this.props;
    const { loading, options } = this.state; 
    let mainPart;
    if (loading) mainPart = <div/>
    const hasAnswer = typeof answer !== 'undefined';
    mainPart = options.map((option) => {
      const data = option.data();
      const selected = (hasAnswer && answer === data.slug)
      return (
        <QuizOption 
          key={`option-${option.id}`}
          selectOption={selectOption}
          itemId={option.id}
          item={data} 
          selected={selected} />
      );
    });
    return (
      <div>
        <h3 css={css`margin-top: 30px;`}>第{step + 1}問: {item.title}</h3>
        <MainWrapper>
          {mainPart}
        </MainWrapper>
      </div>
    );
  }
}