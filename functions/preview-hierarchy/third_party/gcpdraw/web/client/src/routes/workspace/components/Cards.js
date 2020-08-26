import React, {Component} from 'react';
import CARDS from '../../../config/cards';
import NoFilteredResult from './NoFilteredResult';


const Card = (props) => {
  const {cardId, aliases, displayName, iconUrl} = props.card;
  return (
    <tr>
      <td>
        <img alt={cardId} src={iconUrl} className='gd-card-icon' />
      </td>
      <td>{cardId} {aliases.length > 0 ? '(' + aliases.join(', ') + ')': ''}</td>
      <td>{displayName}</td>
    </tr>
  );
};

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {filterBar: null}
  }

  render() {
    const filteredCards = CARDS.filter((data) => {
      if(this.state.filterBar == null)
        return true;
      if (typeof data.displayName !== "undefined" && data.displayName.toLowerCase().includes(this.state.filterBar))
        return true;

      return typeof data.cardId !== "undefined" && data.cardId.toLowerCase().includes(this.state.filterBar);
    });

    return (
        <div>
          <div className="input-group ref-pane-filter-bar ref-pane-controls d-flex">
            <div className='item flex-fill'>
              <input
                  className="form-control m-2"
                  type="text"
                  placeholder="Filter by ID or name"
                  onChange={(e) => this.setState({filterBar: e.target.value})}/>
            </div>
            <div className='item mx-4 align-self-center'>
              <a className=''
                 target='_blank' rel='noopener noreferrer'
                 href='http://go/gcpdraw-bug-new-card'>
                <i className='fas fa-plus-circle pr-1' />
                Add New Card</a>
            </div>
          </div>
          {filteredCards.length > 0 &&
            <table className='table table-striped table-bordered'>
              <thead>
              <tr>
                <th style={{width: '10%'}}>Icon</th>
                <th style={{width: '60%'}}>Card ID (Aliases)</th>
                <th style={{width: '30%'}}>Name</th>
              </tr>
              </thead>
              <tbody>
              {filteredCards.map( (c,i) => <Card key={i} card={c} /> )}
              </tbody>
            </table>
          }
          {filteredCards.length === 0 && <NoFilteredResult />}
        </div>
    )
  }
}

export default Cards;
