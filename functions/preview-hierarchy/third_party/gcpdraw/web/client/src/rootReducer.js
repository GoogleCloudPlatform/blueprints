import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';
import workspace from './routes/workspace/reducers/workspaceReducers';
import exporter from './routes/workspace/reducers/exportReducers';
import saver from './routes/workspace/reducers/saveReducers';
import deleter from './routes/workspace/reducers/deleteReducers';
import communityIcons from './routes/workspace/reducers/communityIconsReducers';
import diagrams from './routes/diagrams/base/reducer';

export default (history) => combineReducers(
    {
      router: connectRouter(history),
      workspace,
      exporter,
      diagrams,
      saver,
      deleter,
      communityIcons,
    }
);
