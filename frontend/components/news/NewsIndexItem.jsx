import React from 'react';

const NewsIndexItem = (props) => {
  const { title, url, urlToImage, source, description } = props.article;
  const sourceName = source.name;

  return (
    <li className="news-index-item">
      <a href={url}>
        <div className="news-index-item-content">
          <img src={urlToImage} className="news-index-img" />
          <div className="news-index-info-container">
            <header>
              <div className="news-source">{sourceName}</div>
              <div className="news-title">{title}</div>
            </header>
            <div className="news-description"> {description} </div>
          </div>
        </div>
      </a>
    </li>
  );
};

export default NewsIndexItem;
