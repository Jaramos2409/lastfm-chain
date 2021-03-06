import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, Switch, HashRouter } from 'react-router-dom';
import promise from 'redux-promise';
import 'bootstrap/dist/css/bootstrap.min.css';

import reducers from './reducers';
import LastFMChainHeader from './components/lastfm_chain_header';
import LastFMChainIndex from './components/lastfm_chain_index';
import LastFMCompareResults from './components/lastfm_compare_results';
import LastFMFooter from './components/lastfm_footer';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <HashRouter basename={process.env.PUBLIC_URL}>
            <div>
                <LastFMChainHeader />
                <Switch>
                    <Route path='/:username_1/:username_2/:timeframe' component={LastFMCompareResults} />
                    <Route path='/' component={LastFMChainIndex} />
                </Switch>
                <LastFMFooter />
            </div>
        </HashRouter>
    </Provider>
, document.getElementById('container'));

