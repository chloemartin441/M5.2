document.addEventListener('DOMContentLoaded', function() {
  // Functionality for showing/hiding the comments section
  const showHideBtn = document.querySelector('.show-hide');
  const commentWrapper = document.querySelector('.comment-wrapper');

  commentWrapper.style.display = 'none';

  showHideBtn.onclick = function() {
    let showHideText = showHideBtn.textContent;
    if (showHideText === 'Show comments') {
      showHideBtn.textContent = 'Hide comments';
      commentWrapper.style.display = 'block';
    } else {
      showHideBtn.textContent = 'Show comments';
      commentWrapper.style.display = 'none';
    }
  };

  const form = document.querySelector('.comment-form');
  const nameField = document.querySelector('#name');
  const commentField = document.querySelector('#comment');
  const list = document.querySelector('.comment-container');

  // Load existing comments from localStorage
  loadComments();

  form.onsubmit = function(e) {
    e.preventDefault();
    submitComment();
  };

  function submitComment() {
    const nameValue = nameField.value.trim();
    const commentValue = commentField.value.trim();

    if (nameValue === '' || commentValue === '') {
      alert('Please fill in both name and comment.');
      return;
    }

    // Create new list item
    const listItem = document.createElement('li');
    const namePara = document.createElement('p');
    const commentPara = document.createElement('p');

    namePara.textContent = nameValue;
    commentPara.textContent = commentValue;

    listItem.appendChild(namePara);
    listItem.appendChild(commentPara);
    list.appendChild(listItem);

    // Save comment to localStorage
    saveCommentToLocalStorage(nameValue, commentValue);

    nameField.value = '';
    commentField.value = '';
  }

  function saveCommentToLocalStorage(name, comment) {
    // Get the existing comments from localStorage
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Add the new comment to the array
    comments.push({ name: name, comment: comment });

    // Save the updated array back to localStorage
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  function loadComments() {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    comments.forEach(comment => {
      const listItem = document.createElement('li');
      const namePara = document.createElement('p');
      const commentPara = document.createElement('p');

      namePara.textContent = comment.name;
      commentPara.textContent = comment.comment;

      listItem.appendChild(namePara);
      listItem.appendChild(commentPara);
      list.appendChild(listItem);
    });
  }
});
