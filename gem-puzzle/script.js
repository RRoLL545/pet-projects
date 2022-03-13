//Play Ground
const playGround = {

    //Play ground elements
    elements : {
        game : null,                //Игра
        screen : null,              //Игровое поле
        statusBar : null,           //Статус игры
        tilesContainer : null,      //Контейнеры для плиток
        tiles : [],                 //Плитки
        menu : null,                //Меню
        //menuItemContainer : null,   //Контейнеры для элементов меню
        menuItems : [],             //Элементы меню
        timeCounter : null,         //Счётчик времени
        movesCounter : null,        //Счётчик ходов
        timeValue : null,          //Показатель счётчика времени
        movesValue : null,         //Показатель счётчика ходов
        coverDark : {                   //завеса
            cover : null,
            title : null,
            description : null,
        },                
    },

    //Events handlers
    eventHandlers : {

    },

    //Properties
    properties : {
        range : 4,                  //Размеры поля
        length : 16,                //Количество плиток
        sound : false,              //Воспроизведение звука
        tilesFace : null,           //Изображение на плитке цифра/картинка
        moves : 0,                  //Отыгранные ходы
        seconds : 0,                //Отыгранное время - секунды
        minutes : 0,                //Отыгранное время - минуты
        pause : true,              //Игра на паузе?
        timer : null,               //Таймер игры
        confirm : null,             //Подтверждение действия
        sound : true,               //Звук
    },

    //Play ground creation
    init() {
        
        //Create main elements
        this.elements.game = document.createElement('div');                 //Игра
        this.elements.screen = document.createElement('div');               //Игровое поле
        this.elements.tilesContainer = document.createElement('div');       //Контейнеры для плиток
        this.elements.menu = document.createElement('div');                 //Меню
        this.elements.statusBar = document.createElement('div');            //Статус игры
        this.elements.timeCounter = document.createElement('div');          //Счётчик времени
            const timeDescription = document.createElement('span');
        this.elements.timeValue = document.createElement('span');
        this.elements.movesCounter = document.createElement('div');         //Счётчик ходов
            const movesDescription = document.createElement('span');
        this.elements.movesValue = document.createElement('span');
        this.elements.coverDark.cover = document.createElement('span');               //Завеса
        this.elements.coverDark.title = document.createElement('h2');
        this.elements.coverDark.description = document.createElement('span');
            const confirmBar = document.createElement('span');                       //Кнопки подтверждения действия
                const yesBtn = document.createElement('span');
                const noBtn = document.createElement('span');
        const audioFile = document.createElement('audio');
        
        //Setup main elements
        this.elements.game.classList.add('game');
        this.elements.screen.classList.add('game__screen');
        this.elements.tilesContainer.classList.add('game__screen__tiles-container');
        this.elements.tilesContainer.appendChild(this._createTiles());
        this.elements.menu.classList.add('game__menu');
        this.elements.menu.appendChild(this._createMenuButtons());
        this.elements.statusBar.classList.add('game__screen__status-bar');
        this.elements.timeCounter.classList.add('game__screen__status-bar__time-counter');
            timeDescription.classList.add('descrition');
            timeDescription.innerHTML = 'Time';
            this.elements.timeValue.classList.add('timer');
            this.elements.timeValue.innerHTML = '00 : 00';
        this.elements.movesCounter.classList.add('game__screen__status-bar__moves-counter');
            movesDescription.classList.add('descrition');
            movesDescription.innerHTML = 'Moves';
            this.elements.movesValue.classList.add('counter');
            this.elements.movesValue.innerHTML = this.properties.moves;
        this.elements.coverDark.cover.classList.add('game__screen__cover');
            this.elements.coverDark.title.classList.add('game__screen__cover--title');
            this.elements.coverDark.title.innerHTML = 'Welcome';
            this.elements.coverDark.description.classList.add('game__screen__cover--description');
            this.elements.coverDark.description.innerHTML = 'Please push "Start" button to play';
            confirmBar.classList.add('game__screen__cover__confirm');
            confirmBar.classList.add('hidden');
            yesBtn.classList.add('game__screen__cover__confirm__button');
            yesBtn.classList.add('yes');
            yesBtn.innerHTML = 'Yes';
            //yesBtn.addEventListener('click', () => { this.properties.confirm = true;});
            noBtn.classList.add('game__screen__cover__confirm__button');
            noBtn.classList.add('no');
            noBtn.innerHTML = 'No';
            //noBtn.addEventListener('click', () => { this.properties.confirm = false;});
        audioFile.setAttribute('id', 'tile-sound');
        audioFile.setAttribute('src', 'assets/tiles-movement-sound.mp3');

        //Add to DOM
        this.elements.game.appendChild(this.elements.screen);
        this.elements.screen.appendChild(this.elements.coverDark.cover);
            this.elements.coverDark.cover.appendChild(this.elements.coverDark.title);
            this.elements.coverDark.cover.appendChild(this.elements.coverDark.description);
                confirmBar.appendChild(yesBtn);
                confirmBar.appendChild(noBtn);
            this.elements.coverDark.cover.appendChild(confirmBar);
        this.elements.screen.appendChild(this.elements.statusBar);
        this.elements.statusBar.appendChild(this.elements.timeCounter);
            this.elements.timeCounter.appendChild(timeDescription);
            this.elements.timeCounter.appendChild(this.elements.timeValue);
        this.elements.statusBar.appendChild(this.elements.movesCounter);
            this.elements.movesCounter.appendChild(movesDescription);
            this.elements.movesCounter.appendChild(this.elements.movesValue);
        this.elements.screen.appendChild(this.elements.tilesContainer);
        this.elements.game.appendChild(this.elements.menu);

        document.body.appendChild(this.elements.game);
        document.body.appendChild(audioFile);
        
        //start of time counting
        this._timer(this.properties.pause);
    },

    //Tiles creation
    _createTiles(x = null) {
        //console.log('hey');
        const fragment = document.createDocumentFragment();
        let tileLayout = [];

        if ( x === null ) {
            //Layout of tiles creation
            // let tileLayout = [];
            for (let i = 0; i < this.properties.length; i++ ) {
                tileLayout[i] = i;
            }
            
            tileLayout = this._shuffle(tileLayout); //shuffling then
            //tileLayout = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
            
            //feasibility check
            let sum = 0;

            for ( i = 0; i < this.properties.length - 1; i++ ) {
                let k = 0;
                for ( j = i; j < this.properties.length; j++ ) {
                    if ( tileLayout[i] > tileLayout[j] && tileLayout[j] !== 0 ) {
                        k++;
                    }
                };
                sum += k;
            }
            let emptyRange = Math.ceil((tileLayout.indexOf(0) + 1) / this.properties.range);
            sum += emptyRange;

            //Layout modification if it is not feasible
            if ( sum % 2 !== 0 ) {
                let temp;
                if ( emptyRange > 1 ) {
                    temp = tileLayout[1];
                    tileLayout[1] = tileLayout[0];
                    tileLayout[0] = temp;
                } else {
                    temp = tileLayout[this.properties.range + 1];
                    tileLayout[this.properties.range + 1] = tileLayout[this.properties.range];
                    tileLayout[this.properties.range] = temp;
                }
            }
        } else {
            tileLayout = Array.from(x.split(','));
        }
        //tileLayout = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15];
        //to string
        for (let i = 0; i < this.properties.length; i++ ) {
            tileLayout[i] = tileLayout[i].toString();
            if ( tileLayout[i] === '' ) { tileLayout[i] = '0';}
        }
        
        tileLayout.forEach( key => {
            const tileElement = document.createElement('div');

            key === '0' ? tileElement.classList.add('game__screen__tile-container__tile--empty') : tileElement.classList.add('game__screen__tile-container__tile');

            

            if ( key !== '0' ) {
                tileElement.innerHTML = key;

                tileElement.addEventListener('click', (e) => {
                    
                    let theParent = document.querySelector('div.game__screen__tiles-container');
                    let emptyTile = document.querySelector(".game__screen__tile-container__tile--empty");
                    let children = Array.from(theParent.childNodes);

                    let indexOfClickedTile = children.indexOf(e.target);
                    
                    let currentRange = this.properties.range;
                    let currentSquare = this.properties.length;
                    
                    //void is in the left
                    if ( indexOfClickedTile > 0 && indexOfClickedTile % currentRange !== 0 ) {
                        if ( e.target.previousSibling.innerHTML === '' ) {
                            this._moveTile('left', theParent, e.target, emptyTile);
                            return;
                        }
                    }

                    //void is in the right
                    if ( indexOfClickedTile < currentSquare-1 && (indexOfClickedTile + 1) % currentRange !== 0) {
                        if ( e.target.nextSibling.innerHTML === '' ) {
                            this._moveTile('right', theParent, emptyTile , e.target);
                            return;
                        }
                    }

                    //void is in the up
                    if ( indexOfClickedTile - currentRange >= 0 ) {
                        if ( children[indexOfClickedTile - currentRange].innerHTML === '' ) {
                            this._moveTile('up', theParent, e.target, emptyTile);
                            return;
                        }
                    }

                    //void is in the down
                    if ( indexOfClickedTile + currentRange <= currentSquare - 1 ) {
                        if ( children[indexOfClickedTile + currentRange].innerHTML === '' ) {
                            this._moveTile('down', theParent, e.target, emptyTile);
                            return;
                        }
                    }
                });
            }
            
            fragment.appendChild(tileElement);
        })

        return fragment;
    },

    //Menu buttons creation
    _createMenuButtons() {
        //console.log('hoy');
        const fragment = document.createDocumentFragment();

        let menuLayout = ['Pause', 'New', 'Save', 'Load', 'High Score', 'Sound on', 'Settings', 'Auto Play', 'About'];

        menuLayout.forEach( key => {
            const menuElement = document.createElement('div');

            menuElement.classList.add('game__menu__button');

            menuElement.innerHTML = key;

            switch (key) {
                case 'Pause':
                    menuElement.innerHTML = 'Start';
                    menuElement.classList.add('pause-resume');
                    menuElement.addEventListener('click', () => {

                        //Останавливает/запускает время
                        this.properties.pause = !this.properties.pause;
                        this._timer(this.properties.pause);

                        //Скрывает подтверждающую панель
                        // document.querySelector('.game__screen__cover__confirm').classList.toggle('hidden');

                        //Изменяет название кнопки, показывает/скрывает завесу
                        if ( this.properties.pause ) {
                            this._setPauseBtnValue('Resume');
                            this._showCover('Game is paused', 'Please push "Resume" button to continue the game');
                            //document.querySelector('.game__screen__cover__confirm').classList.toggle('hidden');
                        } else {
                            this._setPauseBtnValue('Pause');
                            document.querySelector('.game__screen__cover__confirm').classList.add('hidden');
                            this._removeCover();
                        }
                    });
                    break;

                case 'New':
                    menuElement.addEventListener('click', () => {
                        //Сделать кнопку Resume и поставить на паузу
                        this._setPauseBtnValue('Resume');
                        this.properties.pause = true;
                        this._timer(this.properties.pause);
                        
                        //Вывести начальный экран
                        this._showCover('New game', 'Current game will be lost. Continue?');
                        document.querySelector('.game__screen__cover__confirm').classList.remove('hidden');

                        //Навесить функции на кнопки
                        let yesButton = document.querySelector('.yes');
                        yesButton.addEventListener('click', this._createNewGame);
                        let noButton = document.querySelector('.no');
                        noButton.addEventListener('click', this._dontCreateNewGame);
                    });
                    break;

                case 'Save':
                    menuElement.addEventListener('click', () => {
                        //console.log(menuElement.innerHTML);

                        //Сделать кнопку Resume и поставить на паузу
                        this._setPauseBtnValue('Resume');
                        this.properties.pause = true;
                        this._timer(this.properties.pause);

                        //Вывести завесу
                        let isStored = false;
                        if ( localStorage.getItem('layout') ) {
                            isStored = true;
                        }
                        if ( isStored ) {
                            this._showCover('Save slot is not empty', 'Overwrite?');
                            document.querySelector('.game__screen__cover__confirm').classList.remove('hidden');

                            let yesButton = document.querySelector('.yes');
                            yesButton.addEventListener('click', this._overWriteSavedGame);
                            let noButton = document.querySelector('.no');
                            noButton.addEventListener('click', this._dontOverWriteSavedGame);
                        } else {
                            this._savingGame();
                        }
                    });
                    break;

                case 'Load':
                    menuElement.addEventListener('click', () => {
                        //console.log(menuElement.innerHTML);
                        this._setPauseBtnValue('Resume');
                        this.properties.pause = true;
                        this._timer(this.properties.pause);
                        //Есть что в хранилище
                        let isStored = false;
                        if ( localStorage.getItem('layout') ) {
                            isStored = true;
                        }
                        
                        if ( isStored ) {
                            this._showCover('Load game', 'Current game will be lost. Continue?');
                            document.querySelector('.game__screen__cover__confirm').classList.remove('hidden');

                            //Навесить функции на кнопки
                            let yesButton = document.querySelector('.yes');
                            yesButton.addEventListener('click', this._loadGame);
                            let noButton = document.querySelector('.no');
                            noButton.addEventListener('click', this._dontloadGame);
                            

                        } else {
                            
                            this._showCover('No saved game in the storage', 'Please push "Resume" button to continue the current game');
                        }
                    });
                    break;

                case 'High Score':
                    menuElement.addEventListener('click', () => {console.log(menuElement.innerHTML)});
                    break;

                case 'Sound on':
                    menuElement.addEventListener('click', () => {
                        //console.log(menuElement.innerHTML);
                        this.properties.sound = !this.properties.sound;
                        this.properties.sound ? menuElement.innerHTML = 'Sound on' : menuElement.innerHTML = 'Sound off';
                    });
                    break;

                case 'Settings':
                    menuElement.addEventListener('click', () => {console.log(menuElement.innerHTML)});
                    break;

                case 'Auto Play':
                    menuElement.addEventListener('click', () => {console.log(menuElement.innerHTML)});
                    break;

                case 'About':
                    menuElement.addEventListener('click', () => {console.log(menuElement.innerHTML)});
                    break;

                default:
                    break;
            }

            fragment.appendChild(menuElement);
        })

        return fragment;
    },

    _moveTile(direction, Parent, tileToMove, WhereToMove) {
        //tile moveement
        let newEmptyPlace = tileToMove.nextSibling; //place for empty tile
        Parent.insertBefore(tileToMove, WhereToMove); //moving chosen tile
        direction !== 'left' || direction !== 'right' ? Parent.insertBefore(WhereToMove, newEmptyPlace) : ''; //moving empty tile

        //moves counter
        this.elements.movesValue.innerHTML = ++this.properties.moves;

        this._playSound(this.properties.sound);

        //check result
        this._check(Parent);
    },

    _timer(attr) {
        attr ? clearInterval(this.properties.timer) : this.properties.timer = setInterval('playGround._timerLayout()', 1000);
    },

    _timerLayout() {
        ++this.properties.seconds;

        if ( this.properties.seconds === 60 ) {
            this.properties.seconds = 0;
            ++this.properties.minutes;
        }

        let layout = `${addZero(this.properties.minutes.toString())} : ${addZero(this.properties.seconds.toString())}`;

        this.elements.timeValue.innerHTML = layout;
    },

    _shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    },

    _check(parentOfTiles) {
        let array = parentOfTiles.childNodes;
        for (let i = 0; i < this.properties.length - 1; i++) {
            if ( array[i].innerHTML !== (i + 1).toString()) {
                return;
            }
        }
        
        this._congratulation();
    },

    _congratulation() {
        this._showCover('Ура!', `Вы решили головоломку за ${addZero(this.properties.minutes.toString())}:${addZero(this.properties.seconds.toString())} и ${correctEnding(this.properties.moves)}</br>Please start new game or load saved`) 
        this._setPauseBtnValue('Resume');
        this.properties.pause = true;
        this._timer(this.properties.pause);
    },

    _playSound(status) {
        if ( status ) {
            let track = document.querySelector('#tile-sound');
        track.currentTime = 0;
        track.play();
        }
    },

    _showCover(title, description) {
        let coverDOM = this.elements.coverDark.cover;
        let coverDOMParent = this.elements.screen;
        coverDOMParent.appendChild(coverDOM);
        this._editCoverDescription(title, description);
    },

    _editCoverDescription(title, description) {
        let coverTitleDOM = this.elements.coverDark.title;
        let coverDescriptionDOM = this.elements.coverDark.description;
        coverTitleDOM.innerHTML = title;
        coverDescriptionDOM.innerHTML = description;
    },

    _removeCover() {
        let coverDOM = this.elements.coverDark.cover;
        let coverDOMParent = this.elements.screen;
        coverDOMParent.removeChild(coverDOM);
    },

    _setPauseBtnValue(NewName) {
        let pauseBtn = document.querySelector('.pause-resume');
        pauseBtn.innerHTML = NewName;
    },

    _createNewGame() {
        //Обнулить счётчики времени и ходов
        playGround.properties.seconds = 0;
        playGround.properties.minutes = 0;
        playGround.properties.moves = 0;
        let layout = `${addZero(playGround.properties.minutes.toString())} : ${addZero(playGround.properties.seconds.toString())}`;
        playGround.elements.timeValue.innerHTML = layout;
        playGround.elements.movesValue.innerHTML = playGround.properties.moves;

        //Перераспределить костяшки
        //Удалить старые
        playGround.elements.tilesContainer = null;
        let gameScreenDOM = document.querySelector('.game__screen');
        let tilesContainerDOM = document.querySelector('.game__screen__tiles-container');
        gameScreenDOM.removeChild(tilesContainerDOM);
        //Пересоздать новые
        playGround.elements.tilesContainer = document.createElement('div');
        playGround.elements.tilesContainer.classList.add('game__screen__tiles-container');
        playGround.elements.screen.appendChild(playGround.elements.tilesContainer);
        playGround.elements.tilesContainer.appendChild(playGround._createTiles());

        playGround._setPauseBtnValue('Start');

        playGround._editCoverDescription('New game created', 'Please push "Start" button to play');

        document.querySelector('.game__screen__cover__confirm').classList.add('hidden');
        //Удалить обработчики
        document.querySelector('.yes').removeEventListener('click', playGround._createNewGame);
        document.querySelector('.no').removeEventListener('click', playGround._dontCreateNewGame);
    },

    _dontCreateNewGame() {
        //Удалить обработчики
        document.querySelector('.yes').removeEventListener('click', playGround._createNewGame);
        document.querySelector('.no').removeEventListener('click', playGround._dontCreateNewGame);

        document.querySelector('.game__screen__cover__confirm').classList.add('hidden');
        playGround._removeCover();
        playGround._setPauseBtnValue('Pause');
        playGround.properties.pause = false;
        playGround._timer(playGround.properties.pause);
    },

    _overWriteSavedGame() {
        playGround._savingGame();
    },

    _dontOverWriteSavedGame() {
        //Удалить обработчики
        document.querySelector('.yes').removeEventListener('click', playGround._overWriteSavedGame);
        document.querySelector('.no').removeEventListener('click', playGround._dontOverWriteSavedGame);

        document.querySelector('.game__screen__cover__confirm').classList.add('hidden');
        playGround._removeCover();
        playGround._setPauseBtnValue('Pause');
        playGround.properties.pause = false;
        playGround._timer(playGround.properties.pause);
    },

    _savingGame() {
        //Массив с положением костяшек
        let currentLayout = Array.from(document.querySelector('.game__screen__tiles-container').childNodes);
        currentLayout.forEach( (item, index, array) => {
            array[index] = item.innerHTML;
        })

        //Положить в хранилище
        localStorage.setItem('layout', currentLayout);
        localStorage.setItem('minutes', this.properties.minutes);
        localStorage.setItem('seconds', this.properties.seconds);
        localStorage.setItem('moves', this.properties.moves);

        this._showCover('Game is saved', 'Please push "Resume" button to continue the current game');
        document.querySelector('.game__screen__cover__confirm').classList.add('hidden');
        //Удалить обработчики
        document.querySelector('.yes').removeEventListener('click', this._overWriteSavedGame);
        document.querySelector('.no').removeEventListener('click', this._dontOverWriteSavedGame);
    },

    _loadGame() {
        //Забрать данные из хранилища
        let savedLayout = localStorage.getItem('layout');
        let savedMinutes = localStorage.getItem('minutes');
        let savedSeconds = localStorage.getItem('seconds');
        let savedMoves = localStorage.getItem('moves');
        
        //Время и ходы
        playGround.properties.seconds = savedSeconds;
        playGround.properties.minutes = savedMinutes;
        playGround.properties.moves = savedMoves;
        let layout = `${addZero(playGround.properties.minutes.toString())} : ${addZero(playGround.properties.seconds.toString())}`;
        playGround.elements.timeValue.innerHTML = layout;
        playGround.elements.movesValue.innerHTML = playGround.properties.moves;
        
        //Залить костяшки
        //Удалить старые
        playGround.elements.tilesContainer = null;
        let gameScreenDOM = document.querySelector('.game__screen');
        let tilesContainerDOM = document.querySelector('.game__screen__tiles-container');
        gameScreenDOM.removeChild(tilesContainerDOM);
        //Пересоздать новые
        playGround.elements.tilesContainer = document.createElement('div');
        playGround.elements.tilesContainer.classList.add('game__screen__tiles-container');
        playGround.elements.screen.appendChild(playGround.elements.tilesContainer);
        playGround.elements.tilesContainer.appendChild(playGround._createTiles(savedLayout));

        //Удалить обработчики
        document.querySelector('.yes').removeEventListener('click', playGround._loadGame);
        document.querySelector('.no').removeEventListener('click', playGround._dontloadGame);
        playGround._showCover('Game is loaded', 'Please push "Resume" button to continue the loaded game');
        document.querySelector('.game__screen__cover__confirm').classList.add('hidden');
    },

    _dontloadGame() {
        //Удалить обработчики
        document.querySelector('.yes').removeEventListener('click', playGround._loadGame);
        document.querySelector('.no').removeEventListener('click', playGround._dontloadGame);

        document.querySelector('.game__screen__cover__confirm').classList.add('hidden');
        playGround._removeCover();
        playGround._setPauseBtnValue('Pause');
        playGround.properties.pause = false;
        playGround._timer(playGround.properties.pause);
    }
}

//Run
let currentLang = 'En';
window.addEventListener('DOMContentLoaded', playGround.init());

//add zero
function addZero(x) {
    if ( x.length >= 2 ) {
        return x;
    } else {
        return '0' + x;
    }
}

//correct ending of word "ход"
function correctEnding(num) {
    let ending = 'ходов';
    if ( num % 10 === 1 && (num % 100 === 1 || ( num % 100 > 20 && num % 100 < 92 ) ) ) {
        ending = 'ход';
    }
    
    if ( (num % 10 > 1 && num % 10 < 5)  && ( num % 100 < 5 || (num % 100 > 21 && num % 100 < 95) ) ) {
        ending = 'хода';
    }

    return `${num} ${ending}`;
}
