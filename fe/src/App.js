import './common.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Playlist from './containers/playlist';
import Upload from './containers/upload';
import Errors from './containers/errors';

export default function App() {
  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/upload">
            <Upload></Upload>
          </Route>
          <Route path="/">
            <Playlist></Playlist>
          </Route>
        </Switch>
      </Router>
      <Errors/>
    </div>
  );
}