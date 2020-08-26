import React, {Component}from 'react';
import Examples from './Examples';
import Cards from './Cards';
import Syntax from './Syntax';
import CommunityIcons from "./CommunityIcons";

const tabs = [
  {id: 'examples', label: 'Examples'},
  {id: 'cards', label: 'Cards'},
  {id: 'icons', label: 'Custom Icons'},
  {id: 'syntax', label: 'Syntax'},
];

const Tab = (props) => {
  let className = 'pane-nav-link';
  if(props.tab.id === props.currentTabId) {
    className += ' active';
  }
  return (
    <li className='pane-nav-item'>
      <button type='button' className={className} onClick={props.onClick.bind(this, props.tab.id)}
        href='#'>
        {props.tab.label}
      </button>
    </li>
  )
};

const Tabs = (props) => {
  return (
    <div className='gd-pane-header'>
      <ul className='pane-nav pane-nav-tabs'>
        {tabs.map( (t,i) =>
          <Tab key={i} tab={t} currentTabId={props.currentTabId}
            onClick={props.onClick} />
        )}
      </ul>
    </div>
  );
};

class RefPane extends Component {
  constructor(props) {
    super(props);
    this.onTabClick = this.onTabClick.bind(this);
    this.state = {tabId:'examples'};
  }

  onTabClick(id) {
    this.setState({tabId: id});
  }

  render() {
    const {onExampleSelected, getCommunityIcons,
      communityIcons} = this.props;
    const {tabId} = this.state;
    return (
      <div className='gd-pane-fit'>
        <Tabs onClick={this.onTabClick} currentTabId={tabId} />
        <div className='gd-pane-content white'>
          {tabId === 'examples' &&
            <Examples onClick={onExampleSelected} /> }
          {tabId === 'cards' &&
            <Cards /> }
          {tabId === 'syntax' &&
            <Syntax /> }
          {tabId === 'icons' &&
            <CommunityIcons
              communityIcons={communityIcons}
              getCommunityIcons={getCommunityIcons} /> }
        </div>
      </div>
    );
  }
}

export default RefPane;
