// begin - Optimizing Performance
/*class ListOfWords extends React.PureComponent {
  render() {
    console.log('testing words 2:', this.props.words);
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      words: ['marklar']
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // bad code
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});
    console.log('testing words 1:', this.state.words);

    //// ways to avoid mutating data
    // 1st way
    // this.setState(prevState => ({
    //   words: prevState.words.concat(['marker2'])
    // }));
    // 2nd way
    // this.setState(prevState => ({
    //   words: [...prevState.words, 'marklar2']
    // }));
    // console.log('testing 1 this.state.words', this.state.words);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}

ReactDOM.render(
  <WordAdder />,
  document.getElementById('root')
);*/
// end - Optimizing Performance