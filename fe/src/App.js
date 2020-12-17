import './common.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Playlist from './containers/playlist';
import Upload from './containers/upload';
import Errors from './containers/errors';
import {
  ROOT_ROUTE,
  UPLOAD_ROUTE,
} from './constants';

export default function App() {
  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={UPLOAD_ROUTE}>
            <Upload></Upload>
          </Route>
          <Route path={ROOT_ROUTE}>
            <Playlist></Playlist>
          </Route>
        </Switch>
      </Router>
      <Errors/>
    </div>
  );
}