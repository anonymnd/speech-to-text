// let utterance = new SpeechSynthesisUtterance("Hello world!");
// speechSynthesis.speak(utterance);
const synth = window.speechSynthesis;

const inputForm = document.querySelector("form");
const inputTxt = document.querySelector(".txt");
const voiceSelect = document.querySelector("select");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector(".pitch-value");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector(".rate-value");
let voices = [];
//function that loads voices
function loadVoices() {
  voices = synth.getVoices();
  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} - ${voices[i].lang}`;
    if (voices[i].default) {
      option.textContent = " Default";
    }
    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].lang);
    voiceSelect.appendChild(option);
  }
}

loadVoices();
//this is an event that its triggered by changes in the voices list
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = loadVoices;
}

inputForm.onsubmit = (event) => {
  //block the event the submit event
  event.preventDefault();
  //create a new utternace object with the text from the input field
  const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
  ///////////////
  for (i = 0; i < voices.length; i++) {
    if (
      voices[i].name == voiceSelect.selectedOptions[0].getAttribute("data-name")
    ) {
      utterThis.voice = voices[i];
    }
  }
  //set the pitch and rate of the utterance   to the selected values
  utterThis.pitch = pitch.value;
  utterThis.rate = rate.value;
  synth.speak(utterThis);
  inputTxt.blur();
};
