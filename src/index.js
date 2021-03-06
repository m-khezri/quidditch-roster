import $ from 'jquery';
// import 'bootstrap';
import firebase from 'firebase';
import apiKeys from '../db/apiKeys.json';

import loadNavbar from './components/Navbar/navbar';
import dataGetter from './helpers/dataGetter';
import createTeamButtonGroup from './components/TeamButtonGroup/teamButtonGroup';
import teamButton from './components/TeamButton/teamButton';
import createPlayerList from './components/PlayerList/playerList';
import './index.scss';

const getAndPrintTeamButtonGroup = () => {
  dataGetter.getAllTeamsFromDb()
    .then((data) => {
      $('#button-container').html(createTeamButtonGroup(data));
      $('.team-button').on('click', teamButton.buttonEventFunction);
    })
    .catch((error) => {
      console.error('Error in getting teams', error);
    });
};

const getAndPrintAllPlayers = () => {
  dataGetter.getAllPlayersFromDb()
    .then((players) => {
      dataGetter.getFullPlayerInfo(players)
        .then((allPlayersArray) => {
          $('#main-container').html(createPlayerList(allPlayersArray));
        });
    })
    .catch((error) => {
      console.error('Error in getting players', error);
    });
};

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  // console.log('apiKeys', apiKeys);
  loadNavbar();
  getAndPrintTeamButtonGroup();
  getAndPrintAllPlayers();
};

initializeApp();
