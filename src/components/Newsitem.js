// src/Newsitem.js display the news data as components of cards
import React from 'react';
import images from './news.jpeg';

const Newsitem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;

  const Description = (string) => {
    if (string.length > 150) {
      return string.substring(0, 150) + '...';
    } else {
      string = string + " Catch up on the latest news headlines and in-depth articles. Click 'Read' to explore the full story!...";
      return string.substring(0, 150) + '...';
    }
  };

  const Titleshort = (string) => {
    if (string.length < 30) {
      return string.substring(0, 50) + '...';
    } else {
      string =string+" Click 'Read' to explore the full story!...";
      return string.substring(0,70);
    }
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  };

  return (
    <div className="my-3">
      <div className="card">
        <span className="position-absolute badge rounded-pill bg-success">{source}</span>
        <img src={!imageUrl ? images : imageUrl} className="card-img-top" alt="..." style={imageStyle} />
        <div className="card-body">
          <h5 className="card-title">{Titleshort(title)}</h5>
          <p className="card-text">{Description(description)}</p>
          <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </div>
  );
};

export default Newsitem;
