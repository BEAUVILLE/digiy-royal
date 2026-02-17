<script>
function digiyAudioPlay(text, lang="fr-FR") {
  if (!('speechSynthesis' in window)) {
    alert("Audio non supporté sur ce navigateur");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 1;
  utterance.pitch = 1;

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}
</script>
