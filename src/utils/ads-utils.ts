export const removeScript = function (id: string) {
  //console.log('estoy removiendo', id);
  if (typeof document !== 'undefined') {
    const script = document.getElementById(id);
    if (script) script.remove();
  }
};
