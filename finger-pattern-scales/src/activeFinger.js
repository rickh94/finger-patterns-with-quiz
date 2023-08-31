document.addEventListener('alpine:init', () => {
  Alpine.store('activeFinger', {
    joinedId: null,
    fingerNumber: null,

    setActiveFinger(joinedId, fingerNumber) {
      if (fingerNumber < 1 || fingerNumber > 4) {
        console.error("Invalid finger number");
        return;
      }

      this.joinedId = joinedId;
      this.fingerNumber = fingerNumber;
    },

    isFingerActive(joinedId, fingerNumber) {
      if (!this.joinedId || !this.fingerNumber) {
        return false;
      }
      if (fingerNumber < 1 || fingerNumber > 4) {
        return false;
      }
      return this.joinedId === joinedId && this.fingerNumber === fingerNumber;
    },

    updatedHighlightedNote(nd) {
      if (this.joinedId || !this.fingerNumber) {
        return;
      }

    const joinedId = parseInt(this.joinedId, 10);
    const noteNumber = joinedId * 4 + this.fingerNumber + nd.offset;
    nd.querySelectorAll('.abcjs-note_selected').forEach(el => el.classList.remove('abcjs-note_selected'));
    nd.querySelector(`.abcjs-n${noteNumber}`)?.classList.add('abcjs-note_selected');
    }

  });
})

