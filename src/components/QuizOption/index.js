import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';

const Wrapper = styled.div({
  padding: '15px',
  backgroundColor: '#fff',
  borderRadius: 10,
  cursor: 'pointer',
  border: '2px solid #fff',
  ':hover': {
    border: '2px solid #ad97ef'
  },
  fontSize: '1.2em',
  marginBottom: '1.2em'
}, ({ selected }) => {
  const styles = [];
  if (selected) styles.push({ border: '2px solid #ad97ef' })
  return styles;
})

const QuizOption = ({ itemId, item, selected, selectOption }) => {
  return (
    <Wrapper 
      selected={selected}
      onClick={(e) => selectOption(item.slug, e)}>
      <div>{item.order + 1}: {item.title}</div>
    </Wrapper>
  );
}

QuizOption.propTypes = {
  itemId: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired, 
  selectOption: PropTypes.func.isRequired
}

export default QuizOption;