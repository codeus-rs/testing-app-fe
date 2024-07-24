import React from 'react';

const articles = [
  {
    title: 'Why Automated Testing',
    content: 'Automated testing is important because...',
  },
  {
    title: 'Testing with Jest',
    content: 'Jest is a delightful JavaScript Testing Framework...',
  },
  {
    title: 'Playwright',
    content: 'Playwright enables reliable end-to-end testing...',
  },
];

const Home = () => {
  return (
    <div className="container">
      <h1>Home</h1>
      {articles.map((article, index) => (
        <div key={index} className="card" data-testid={`article-${index}`}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
