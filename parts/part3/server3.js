const userListElement = document.getElementById('userList');

function updateUserList() {
  userListElement.innerHTML = '';
  clients.forEach(client => {
    const userItem = document.createElement('div');
    userItem.textContent = client.username;
    userListElement.appendChild(userItem);
  });
}