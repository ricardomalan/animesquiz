import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Logo({ className }) {
  return (
    <img
      alt=""
      className={className}
      width="87"
      height="77"
      viewBox="0 0 87 77"
      src="https://lh3.googleusercontent.com/A_BG3F4Jo-NSjAvv9uqduQvVQFKOXLoyeKYzqr2yoYsQdLI991onDlyWX2ZMWn0W_8o"
    />
  );
}

Logo.propTypes = {
  className: PropTypes.string.isRequired,
};

const QuizLogo = styled(Logo)`
  margin: auto;
  display: block;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

export default QuizLogo;
