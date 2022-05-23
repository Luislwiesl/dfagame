window.addEventListener('load', () => {
    const name = sessionStorage.getItem('NAME');
    document.getElementById('player-name').innerHTML = name;
  
    const score = sessionStorage.getItem('SCORE');
    document.getElementById('player-score').innerHTML = score;

})