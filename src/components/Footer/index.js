import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #ffffff99;
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 4px; 
  color: black;
  img {
    width: 58px;
    margin-right: 23px;
  }
  a {
    color: black;
    text-decoration: none;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
    span {
      text-decoration: underline;
    }
  }
`;

export default function Footer(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FooterWrapper {...props}>
      <a href="https://github.com/ricardomalan/animesquiz">
        <img src="https://images.vexels.com/media/users/3/150066/isolated/lists/0cdd0e37da871b0c909092e040d1bba5-ilustracao-de-olho-de-anime-pensativo.png" alt="Logo Olho Anime" />
      </a>
      <p>
        Orgulhosamente criado durante
        {' '}
        a
        {' '}
        <a href="https://www.alura.com.br/">
          <span>Imersão React - Edition NextJs Alura</span>
        </a>
      </p>
    </FooterWrapper>
  );
}
