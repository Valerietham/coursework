function displayGreeting() {
  var name = document.getElementById('name').value;
  document.getElementById('greetingMessage').innerHTML =
    'Welcome ' + name + '!';
}

console.log('this is a Message');
console.info('this is info');
console.warn('this is a warning');
console.error('this is an error');
