import React from 'react';

export default class ServiceImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const content = this.props.content;
    const order = this.props.order;
    var classImage;
    if(order==='even') {
      classImage = 'col-lg-offset-2';
    } else if(order==='odd') {
      classImage = '';
    }

    return (
      <div className={"col-lg-5 col-sm-6 " + classImage}>
        <img className="img-responsive" src={'./app/images/' + content.img_link} />
      </div>
    );
  }
}