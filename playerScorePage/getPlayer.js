function handleName () {
    const name = document.getElementById('name').value;

    sessionStorage.setItem("NAME", name);
    console.log(name)

    window.location.href = '../../game/game.html';
}
