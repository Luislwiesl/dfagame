window.addEventListener('load', () => {
    
    const name = sessionStorage.getItem('NAME');
    document.getElementById('player-name').innerHTML = name;
    
})