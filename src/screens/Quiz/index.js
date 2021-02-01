/* eslint-disable react/prop-types */
import React from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import { motion } from 'framer-motion';
import { Lottie } from '@crello/react-lottie';

import AlternativesForm from '../../components/AlternativesForm';
import BackLinkArrow from '../../components/BackLinkArrow';
import Button from '../../components/Button';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import QuizLogo from '../../components/QuizLogo';
import Widget from '../../components/Widget';

import loadingAnimation from '../../animations/loadingBuster.json';

const LinkAlura = styled.a`
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => `${theme.colors.contrastText}30`};
  padding: 10px 15px;
  margin-top: 15px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  display: block;

  &:hover,
  &:focus {
    opacity: .5;
  }
`;

function ResultWidget({ results }) {
  const router = useRouter();
  const { name } = router.query;
  const number = results.filter((x) => x).length;
  const word = number === 1 ? 'questão' : 'questões';

  function message(value) {
    if (value === 0) {
      return 'Mas tente de novo.';
    }
    if (value <= 3) {
      return 'Mandou muito bem, quase perfeito. Se estiver interessado em aprender programação, para um dia criar um quiz como esse ou desenvolver algo mais criativo, não deixa de conferir os cursos da Alura.';
    }
    if (value > 3) {
      return 'Caracas perfeito, você foi incrível. E sobre programação, quer aprender ou adquirir mais conhecimento não deixa de conferir os cursos da Alura.';
    }
  }

  return (
    <Widget
      as={motion.section}
      transition={{ delay: 0.2, duration: 0.5 }}
      variants={{
        show: { opacity: 1, y: '0' },
        hidden: { opacity: 0, y: '100%' },
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        Resultado
      </Widget.Header>

      <Widget.Content>
        {number === 0
          ? (
            <p style={{ fontSize: '16px', marginBottom: '15px' }}>
              Poxa,
              {' '}
              {name}
              !
              <h1 style={{ fontSize: '20px', marginBottom: '15px' }}>
                {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
                {'Infelizmente você não acertou nenhuma questão :('}
              </h1>
              {' '}
              {message(number)}
            </p>
          )
          : (
            <p style={{ fontSize: '16px' }}>
              Show,
              {' '}
              {name}
              !
              {' '}
              <h1 style={{ fontSize: '20px', marginBottom: '15px' }}>
                Você acertou
                {' '}
                {number}
                {' '}
                {word}
                ,
                {' '}
                parabéns!
              </h1>
              {' '}
              {message(number)}
              {' '}
              <LinkAlura
                href="https://www.alura.com.br/"
              >
                <img src="https://www.alura.com.br/assets/img/alura-logo-white.1570550707.svg" alt="Logo Alura" />
              </LinkAlura>
            </p>
          )}

        <Button onClick={() => router.push('/')}>Jogar Novamente</Button>

      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
        <Lottie
          width="200px"
          height="200px"
          className="lottie-container basic"
          config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 1 * 1500);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onClick={() => (isSelected
                    ? setSelectedAlternative(undefined)
                    : setSelectedAlternative(alternativeIndex))}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>

        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg }) {
  const router = useRouter();
  const { screen } = router.query;
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;
  const bg = externalBg;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1500);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        {screen && <QuizLogo />}

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}

      </QuizContainer>
    </QuizBackground>
  );
}
