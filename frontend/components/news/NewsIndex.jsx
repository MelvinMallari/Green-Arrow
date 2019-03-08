import React from 'react';
import NewsIndexItem from './NewsIndexItem';

const NewsIndex = props => {
  const { articles } = props;
  return(
    <div className="news-index-container">
      <header className="news-index-header-container">
        <h2 className="news-index-header">Recent News</h2>
      </header>
      <ul>
        {
          articles.map(article => (
            <NewsIndexItem 
              article={article} 
              key={article.publishedAt} />)
            )
        }
      </ul>
    </div>
  );
}

export default NewsIndex;

