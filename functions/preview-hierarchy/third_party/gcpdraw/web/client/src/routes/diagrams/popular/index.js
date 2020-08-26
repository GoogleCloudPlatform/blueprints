import {connect} from 'react-redux';
import {DiagramsContainer, mapStateToProps, mapDispatchToProps
} from '../base/Container';


class PopularContainer extends DiagramsContainer {
  runQuery() {
    this.props.listDiagrams({popular: "week"});
  }
};


PopularContainer.defaultProps = {
  title: 'Popular Diagrams'
};


export default connect(mapStateToProps, mapDispatchToProps)(PopularContainer);
