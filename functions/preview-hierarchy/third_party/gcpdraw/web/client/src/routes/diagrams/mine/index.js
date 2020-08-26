import {connect} from 'react-redux';
import {DiagramsContainer, mapStateToProps, mapDispatchToProps
} from '../base/Container';


class MineContainer extends DiagramsContainer {
  runQuery() {
    this.props.listDiagrams({ownername: window.currentUsername});
  }

  componentDidUpdate(prevProps) {
    const {pathname, diagrams, push} = this.props;
    const {loaded} = diagrams;
    if(loaded === true
      && diagrams.diagrams.length === 0
      && pathname === '/') {
      push('/diagrams/new');
    }
  }
};


MineContainer.defaultProps = {
  title: 'My Diagrams'
};


export default connect(mapStateToProps, mapDispatchToProps)(MineContainer);
