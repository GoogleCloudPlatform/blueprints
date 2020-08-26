// import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'connected-react-router';
import React from 'react';
import {ContainerApp} from '../../../App';
import {PageTitleBar, PageTitle} from '../../../components/Layout';
import {BaseContainer} from '../../../components/Containers';
import LoaderSet from '../../../components/LoaderSet';
import {DiagramCollection} from './Collection.js';
import {initializeData, listDiagrams, searchDiagrams} from './actions';


export class DiagramsContainer extends BaseContainer {
  runQuery() {
  }

  componentDidMount() {
    document.title = this.props.title;
    this.runQuery();
  }

  render() {
    const {push} = this.props;
    const {loading, loadError, loaded, diagrams, query} = this.props.diagrams;
    return (
      <ContainerApp>
        <LoaderSet loading={loading} loadError={loadError} />
        {loaded &&
          <React.Fragment>
            <PageTitleBar>
              <PageTitle>
                {query && <span>Search Result: {query}</span>}
                {!query && <span>{this.props.title}</span>}
              </PageTitle>
            </PageTitleBar>
            <DiagramCollection diagrams={diagrams} push={push} />
          </React.Fragment>
        }
      </ContainerApp>
    );
  }
};

DiagramsContainer.defaultProps = {
  title: 'Diagrams'
};


export const mapStateToProps = state => ({
  diagrams: state.diagrams,
  pathname: state.router.location.pathname,
});


export const mapDispatchToProps = dispatch => {
  return {
    initializeData: bindActionCreators(initializeData, dispatch),
    listDiagrams: bindActionCreators(listDiagrams, dispatch),
    searchDiagrams: bindActionCreators(searchDiagrams, dispatch),
    push: bindActionCreators(push, dispatch),
  }
};
