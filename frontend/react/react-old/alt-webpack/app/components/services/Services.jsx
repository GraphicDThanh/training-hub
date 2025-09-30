import React from 'react';
import ServiceContent from './ServiceContent';
import ServiceImage from './ServiceImage';
import data from './../../static-data/static-data.json.js';

export default class Services extends React.Component {
  constructor(props) {
    super(props);

    this.renderSection = this.renderSection.bind(this);
  }

  render() {
    const sectionList = data.servicesSections;

    return (
      <div className="services">
        {sectionList.map((section, i) => this.renderSection(section, i))}
      </div>
    );
  }

  renderSection(section, i) {
    var classSection, sectionContent;
    
    if(i%2 === 0) {
      classSection = "services__section services__section--even";
      sectionContent = [
        <ServiceContent content={section} order={'even'} key={i} />, 
        <ServiceImage content={section} order={'even'} key={i+1} />
      ];
    } else {
      classSection = "services__section services__section--odd";
      sectionContent = [
        <ServiceImage content={section} order={'odd'} key={i} />, 
        <ServiceContent content={section} order={'odd'} key={i+1} />
      ];
    }

    return (
      <div className={classSection} key={i}>
        <div className="container">
          <div className="row">
            {sectionContent}
          </div>
        </div>
      </div>
    );
  }
}
