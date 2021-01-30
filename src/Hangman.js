import React, { PureComponent } from 'react';
import {randomWord} from './words';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';

class Hangman extends React.Component{

static defaultProps = {
 maxguess: 6,
 images: [img0, img1, img2, img3, img4, img5, img6]
};   

constructor(props){
    super(props);
    this.state = {
      noWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    };
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
};


reset(){
  this.setState({
    noWrong: 0,
    guessed: new Set(),
    answer: randomWord()
  })
}


textGenerator(){
  let txt = [];
    this.state.answer.split("").forEach(ltr => {
    if(this.state.guessed.has(ltr)){
      txt.push(ltr);
    } else {
      txt.push('_');
    }
  });

 return txt.join('');
 

}


handleClick(event){
event.preventDefault();
let ltr = event.target.value;

this.setState(st => ({
 noWrong: st.answer.split("").includes(ltr) ? st.noWrong : st.noWrong + 1, 
 guessed: st.noWrong < 6 ? st.guessed.add(ltr) : st.guessed

}))
}




generateButtons() {

  if(this.state.noWrong < 6){
    return 'abcdefghijklmnopqrstuvwxyz'.split("").map(ltr => (
      <button className="btn"
      key={ltr}
      value={ltr}
      onClick={this.handleClick}
      disabled={this.state.guessed.has(ltr)}
      >{ltr}</button>
  ))
  } else {
     return (
       <div className="you-lose">
           <h3>Sorry, You Lose</h3>
           <button className="btn-playAgain" onClick={this.reset}>Play Again</button>
       </div>
     )
  }
  
}


winner(){
  if(this.textGenerator() === this.state.answer){
    return (
      <div className="you-win">
           <h3>You Win</h3>
           <button className="btn-playAgain" onClick={this.reset}>Play Again</button>
       </div>
    );

    
  }
}


render() {
  console.log(this.state.noWrong);
    return (
        <div className="hangman">
            <h1>Hangman Game</h1>
            <img src={this.props.images[this.state.noWrong]} alt={this.props.images[this.state.noWrong]}/>
            <p className="text">{this.textGenerator()}</p>
            <div className={`buttons ${this.textGenerator() === this.state.answer ? 'buttons-hide' : ''}`}>
              {this.generateButtons()}
            </div>
            {this.winner()}
        </div>
    )
}

};


export default Hangman;

// Array.from(this.state.answer.split("").map(ltr => "_"))