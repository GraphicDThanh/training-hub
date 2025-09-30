import React from 'react';

export default class ServiceContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const content = this.props.content;
    const order = this.props.order;
    var classContent;
    if(order==='even') {
      classContent = '';
    } else if(order==='odd') {
      classContent = 'col-lg-offset-1';
    }

    return (
      <div className={"col-lg-5 col-sm-6 " + classContent}>
        <div className="services__section--head-line"></div>
        <div className="services__section--title">
          <p className="services__section--title-part-1">{content.title_part1}</p>
          {content.title_part2}
        </div>
        <p className="services__section--content">
          {content.content_part1} 
          <a href={'http://' + content.linkto_1}>{content.content_part2}</a>
          {content.content_part3}
          <a href={'http://' + content.linkto_2}>{content.content_part4}</a>
        </p>
      </div>
    );
  }
}