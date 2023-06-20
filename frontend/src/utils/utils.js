export function renderLoadingSave(isLoading, button, text) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  }
  else {
    button.textContent = text;
  }
}