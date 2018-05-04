import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers';
import LastFMChainHeader from './components/lastfm_chain_header';
import LastFMChainIndex from './components/lastfm_chain_index';
import LastFMCompareResults from './components/lastfm_compare_results'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <LastFMChainHeader />
                <Switch>
                    <Route path="/:username_1/:username_2/:timeframe" component={LastFMCompareResults} />
                    <Route path="/" component={LastFMChainIndex} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
, document.getElementById('container'));

registerServiceWorker();
