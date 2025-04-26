import React, { useState, useEffect } from 'react';
import Options from './components/Options/Options';
import Feedback from './components/Feedback/Feedback';
import Notification from './components/Notification/Notification';
import Description from './components/Description/Description';

const App = () => {
  const [feedback, setFeedback] = useState(() => {
    // Зчитуємо значення за ключем
    const savedFeedback = localStorage.getItem('saved-feedback');

    // Якщо там щось є, повертаємо це
    // значення як початкове значення стану
    return savedFeedback
      ? JSON.parse(savedFeedback)
      : { good: 0, neutral: 0, bad: 0 };
  });

  //Effect
  useEffect(() => {
    localStorage.setItem('saved-feedback', JSON.stringify(feedback));
  }, [feedback]);

  // Функція обробки кліків по кнопкам
  const updateFeedback = feedbackType => {
    setFeedback(prev => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };

  // Загальна кількість відгуків
  const { good, neutral, bad } = feedback;
  const totalFeedback = good + neutral + bad;

  // part of Positive feedbacks
  const positiveFeedback = Math.round((good / totalFeedback) * 100);

  // Функція скидання відгуків
  const dropFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  return (
    <>
      <Description />
      <Options
        options={Object.keys(feedback)}
        onSendFeedback={updateFeedback}
        total={totalFeedback}
        onDrop={dropFeedback}
      />
      {totalFeedback ? (
        <Feedback
          feedback={feedback}
          total={totalFeedback}
          positive={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
};

export default App;
