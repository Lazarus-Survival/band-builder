const bandSelector = document.querySelector("#bandType");

bandSelector.addEventListener("change", event => {
  const nextBand = event.target.value;
  if (typeof state === "undefined" || nextBand === state.bandKey) return;

  const confirmed = window.confirm(
    "¿Estás seguro? Cambiar de banda reseteará la banda actual y eliminará sus miembros, armas, munición y equipo."
  );

  if (!confirmed) {
    event.preventDefault();
    event.stopImmediatePropagation();
    event.target.value = state.bandKey;
  }
});
