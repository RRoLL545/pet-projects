//the keybord
const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },
    
    eventHandlers: {
        oninput: null,
        onclose: null
    },
    
    properties: {
        value: "",              //typed value to be displaed
        capsLock: false,        //capsLock pressed
        shift: false,           //shift pressed
        sound: false,           //sound disabled
        voise: false            //voise input disabled
    },

    //keybord creation
    init(lang) {
        // Create main elements
        this.elements.main = document.createElement("div");             //keybord
        this.elements.keysContainer = document.createElement("div");    //keys

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");   //classes for keybord
        this.elements.keysContainer.classList.add("keyboard__keys");        //class for keys
        this.elements.keysContainer.appendChild(this._createKeys(lang));    //put keys in keys container

        //collect keys for uupercasing
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
        
        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);    //keys containers to keybord
        document.body.appendChild(this.elements.main);                  //keybord to body

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

     

    _createKeys(lang) {
        const fragment = document.createDocumentFragment();


        let keyLayout = keysValues[lang].basic; //key labeling
        
        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "]", "ъ", "enter", "sound"].indexOf(key) !== -1;
    
            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");
  
            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = this.createIconHTML("backspace");
        
                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                        playSound(this.properties.sound, 'space');
                        document.querySelector('.use-keyboard-input').focus();
                    });
        
                break;
    
                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.setAttribute("id", "caps-lock");
                    keyElement.innerHTML = this.createIconHTML("keyboard_capslock");
        
                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                        playSound(this.properties.sound, 'caps');
                        document.querySelector('.use-keyboard-input').focus();
                    });
        
                break;
    
                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = this.createIconHTML("keyboard_return");
        
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                        playSound(this.properties.sound, 'enter');
                        document.querySelector('.use-keyboard-input').focus();
                    });
        
                break;
    
                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = this.createIconHTML("space_bar");
        
                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                        playSound(this.properties.sound, 'space');
                        document.querySelector('.use-keyboard-input').focus();
                    });
        
                break;
    
                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = this.createIconHTML("keyboard_hide");
        
                    keyElement.addEventListener("click", () => {
                    this.close();
                    this._triggerEvent("onclose");
                    document.querySelector('.use-keyboard-input').focus();
                    });
        
                break;

                case "shift":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = key.toLowerCase() + this.createIconHTML("upgrade");
                    keyElement.setAttribute("id", "shift");

                    keyElement.addEventListener("click", () => {
                        this._toggleShift();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
                        playSound(this.properties.sound, 'shift');
                        document.querySelector('.use-keyboard-input').focus();
                    });
                break;

                case "sound":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = this.properties.sound ? this.createIconHTML('music_note') : this.createIconHTML('music_off');
                    keyElement.setAttribute("id", "sound");

                    keyElement.addEventListener("click", () => {
                        this._toggleSound();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.sound);
                        document.querySelector('.use-keyboard-input').focus();
                    });
                break;

                case "voice input":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = this.createIconHTML("voice_over_off");
                    keyElement.setAttribute("id", "voise");

                    keyElement.addEventListener("click", () => {
                        this._toggleVoice();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.voise);
                        document.querySelector('.use-keyboard-input').focus();
                    });
                break;

                case "arrow_left":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = this.createIconHTML("keyboard_arrow_left");
                break;

                case "arrow_right":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = this.createIconHTML("keyboard_arrow_right");
                break;

                case "lang":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = `${this.createIconHTML("language")} ${currentLang}`;
                    keyElement.setAttribute("id", "language");

                    keyElement.addEventListener("click", () => {
                        this._toggleLanguage();
                        document.querySelector('.use-keyboard-input').focus();
                    });
                break;

                default:
                keyElement.textContent = key.toLowerCase();
    
                keyElement.addEventListener("click", () => {
                    this.properties.value += keyElement.textContent;
                    
                    this._triggerEvent("oninput");
                    //Shift must be false after action if it was true
                    if ( this.properties.shift ) {
                        this._toggleShift();
                        document.querySelector("#shift").classList.toggle("keyboard__key--active", this.properties.shift);
                    };
                    playSound(this.properties.sound);
                    document.querySelector('.use-keyboard-input').focus();
                });

                break;
            }
  

            fragment.appendChild(keyElement);
    
            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });
  
        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
          this.eventHandlers[handlerName](this.properties.value);
        }
    },
    
    //CapsLock button function
    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
    
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) { //if it is not function button
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }

        //Shift must be false if true
        if ( this.properties.shift ) {
            this._toggleShift();
            document.querySelector("#shift").classList.toggle("keyboard__key--active", this.properties.shift);
        };
    },

    //Lang button function -> switch language
    _toggleLanguage() {
        if ( currentLang === 'En') {
            currentLang = 'Ru';
            console.log(currentLang);
        } else {
            currentLang = 'En';
            console.log(currentLang);
        }

        //Set keys values according to switched language
        let i = 0;
        for (const key of this.elements.keys) {
            
            if (key.childElementCount === 0) {
                key.textContent = currentLang === 'En' ? keysValues.En.normal[i] : keysValues.Ru.normal[i];
                i++;
            }

            //Caps must be false if true
            if ( this.properties.capsLock ) {
                this._toggleCapsLock();
                document.querySelector("#caps-lock").classList.toggle("keyboard__key--active", this.properties.capsLock);
            };
            //Shift must be false if true
            if ( this.properties.shift ) {
                this._toggleShift();
                document.querySelector("#shift").classList.toggle("keyboard__key--active", this.properties.shift);
            };
        }

        document.querySelector("#language").innerHTML = `${this.createIconHTML('language')} ${currentLang}`;
    },
    
    //Shift button function
    _toggleShift() {
        this.properties.shift = !this.properties.shift;
        let i = 0;
        if ( this.properties.capsLock ) {
            for (const key of this.elements.keys) {
                if (key.childElementCount === 0) {
                    key.textContent = keysValues[currentLang][ this.properties.shift ? 'shifted' : 'normal' ][i];
                    key.textContent = !this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
                    i++;
                }
            }
        } else {
            for (const key of this.elements.keys) {
                if (key.childElementCount === 0) {
                    key.textContent = keysValues[currentLang][ this.properties.shift ? 'shifted' : 'normal' ][i];
                    key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
                    i++;
                }
            }
        }
    },

    //Sound function
    _toggleSound() {
        this.properties.sound = !this.properties.sound;
        document.querySelector("#sound").innerHTML = this.properties.sound ? this.createIconHTML('music_note') : this.createIconHTML('music_off');
    },

    //Voise input function
    _toggleVoice() {
        this.properties.voise = !this.properties.voise;
        document.querySelector("#voise").innerHTML = this.properties.voise ? this.createIconHTML('record_voice_over') : this.createIconHTML('voice_over_off');

        if ( this.properties.voise ) {
            voiseRecording(); //Исправить
        }
    },


    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },
    
    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    },

    createIconHTML(icon_name) {
        return `<span class="material-icons">${icon_name}</span>`;
    },
}

//keybord keys collection

const keysValues = {
    En : {
        'basic' : [
            "`","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
             "voice input","q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "sound",
            "done", "lang", "space", "arrow_left", "arrow_right" 
        ],
        'normal' : [
            "`","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
            "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'",
            "z", "x", "c", "v", "b", "n", "m", ",", ".", "/"
        ],
        'shifted' : [
            "~","!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", 
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}",
            "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", '"',
            "z", "x", "c", "v", "b", "n", "m", "<", ">", "?"
        ]
    },
    Ru : {
        'basic' : [
            "ё","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "voice input","й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
            "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "sound",
            "done", "lang", "space", "arrow_left", "arrow_right"
        ],
        'normal' : [
            "ё","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
            "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э",
            "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "."
        ],
        'shifted' : [
            "ё","!", '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
            "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э",
            "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ","
        ]
    }
};

//Audio on buttons

const audio = {
    En : {
        'regular' : document.querySelector('#sound-key-en'),
        'shift' : document.querySelector('#sound-key-shift'),
        'caps' : document.querySelector('#sound-key-caps'),
        'space' : document.querySelector('#sound-key-space'),
        'enter' : document.querySelector('#sound-key-enter')
    },
    Ru : {
        'regular' : document.querySelector('#sound-key-ru'),
        'shift' : document.querySelector('#sound-key-shift'),
        'caps' : document.querySelector('#sound-key-caps'),
        'space' : document.querySelector('#sound-key-space'),
        'enter' : document.querySelector('#sound-key-enter')
    }
}

//play sound
function playSound(status, type = 'regular') {
    if ( status ) {
        let track = audio[currentLang][type];
    track.currentTime = 0;
    track.play();
    }
}

//Voise input
function voiseRecording() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    var words = document.querySelector(".words-placeholder");
    let whereToPut = document.querySelector(".use-keyboard-input");
    var rec = new SpeechRecognition();
    rec.interimResults = true;
    rec.lang = currentLang === 'En'? 'en-US': 'ru';

    var p = document.createElement("p");
    words.appendChild(p);

    if ( Keyboard.properties.voise ) {
        rec.start();
    } else {
        return;
    }
    

    rec.addEventListener("result", function(e) {
        var text = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

        if ( Keyboard.properties.voise ) {
            p.innerHTML = text;
        } else {
            return;
        }
    });
    
    rec.addEventListener("end", function(e) {
        if ( Keyboard.properties.voise ) {
            if (p.innerHTML) {
                p = document.createElement("p");
                words.appendChild(p);
            }
            whereToPut.value += words.children[ words.childElementCount - 2 ].innerHTML + '\n';
            rec.start();
        } else {
            return;
        };
    });
}


//Run
let currentLang = 'En';
window.addEventListener("DOMContentLoaded", Keyboard.init(currentLang));