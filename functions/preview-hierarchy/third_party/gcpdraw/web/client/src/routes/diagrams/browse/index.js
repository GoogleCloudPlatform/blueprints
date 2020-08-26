import {connect} from 'react-redux';
import queryString from 'query-string';
import {DiagramsContainer, mapStateToProps, mapDispatchToProps
} from '../base/Container';

class BrowseContainer extends DiagramsContainer {
  runQuery() {
    const {q} = queryString.parse(this.props.location.search);
    if(q) {
      this.props.searchDiagrams(q);
    }
    else {
      this.props.listDiagrams()
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseContainer);
