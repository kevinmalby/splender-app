export class User {
  username = '';
  email = '';
  stats = {};

  setTwoPlayerStats(twoPlayerWins, twoPlayerLosses, totalTwoPlayerPlays) {
    this.stats.twoPlayerWins = twoPlayerWins;
    this.stats.twoPlayerLosses = twoPlayerLosses;
    this.stats.totalTwoPlayerPlays = totalTwoPlayerPlays;
  }

  setThreePlayerStats(threePlayerWins, threePlayerLosses, totalThreePlayerPlays) {
    this.stats.threePlayerWins = threePlayerWins;
    this.stats.threePlayerLosses = threePlayerLosses;
    this.stats.totalThreePlayerPlays = totalThreePlayerPlays;
  }

  setFourPlayerStats(fourPlayerWins, fourPlayerLosses, totalFourPlayerPlays) {
    this.stats.fourPlayerWins = fourPlayerWins;
    this.stats.fourPlayerLosses = fourPlayerLosses;
    this.stats.totalFourPlayerPlays = totalFourPlayerPlays;
  }

  setGeneralGameStats(gamesLeftEarly, totalNoblesReceived) {
    this.stats.gamesLeftEarly = gamesLeftEarly;
    this.stats.totalNoblesReceived = totalNoblesReceived;
  }
}