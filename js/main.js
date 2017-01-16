// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark (e) {
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    let bookmark = {
        name: siteName,
        url: siteUrl
    };
    
    if (localStorage.getItem('bookmarks') === null) {
        let bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('myForm').reset();
    fetchBookmarks();
    e.preventDefault();
}


function deleteBookmark (url) {
    let  bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url){
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks () {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    for (let i = 0; i < bookmarks.length; i++) {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarksResults.innerHTML += 
            '<div class="well">' +
            '<h3>' +name+
            ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
            ' <a onClick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' + 
            '</h3>' +
            '</div>';
            // `<div class="well">
            //     <h3>${name}</h3>
            //     <a class="btn btn-default" target="_blank" href="${url}">Visit</a>
            //     <a onClick="deleteBookmark(${url})" class="btn btn-danger" href="#">Delete</a>
            // </div>    
            // `
    }
}

function validateForm (siteName, siteUrl) {
    if(!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use a valid url');
        return false;
    }

    return true;
}