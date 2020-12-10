import './common.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Playlist from './containers/Playlist';
import Upload from './containers/Upload';

export default function App({ playlist, loadPlaylist }) {
  
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
    </div>
  );
}