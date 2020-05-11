var postId;

document.querySelector('#userGetAll').addEventListener('click', getAllPosts);

function activatePosts() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        } 
    });
    }
}

function getAllPosts() {
    var url = "https://jsonplaceholder.typicode.com/posts";
    var xhr = new XMLHttpRequest();

    document.querySelector('#posts').innerHTML = `<h2>Postlar</h2>
                                                    <div id="loading">
                                                        <img src="loading.gif" alt="loading_gif">
                                                    </div>
                                                `;
    document.querySelector('#loading').style.display = "block";

    xhr.open('GET', url, true);
    xhr.onload = function(){

        if (this.status === 200) {
            document.querySelector('#loading').style.display = "none";

            var posts = JSON.parse(this.responseText);

            var html = `<h2>Postlar</h2>
                        <div id="loading">
                            <img src="loading.gif" alt="loading_gif">
                        </div>
            `;
            

            posts.forEach(post => {                
                html += `
                <button class="accordion">${post.title}</button>
                <div class="panel">
                    <p>${post.body}</p>
                </div>
                `;
            });

            document.querySelector('#posts').innerHTML = html;
            activatePosts();
        }
    }
    xhr.send();
}

function getPosts(idItem) {
    var url = "https://jsonplaceholder.typicode.com/posts?userId=";
    url += String(idItem);
    var xhr = new XMLHttpRequest();
    
    document.querySelector('#posts').innerHTML = `<h2>Postlar</h2>
                                                    <div id="loading">
                                                        <img src="loading.gif" alt="loading_gif">
                                                    </div>
                                                `;
    document.querySelector('#loading').style.display = "block";

    xhr.open('GET', url, true);
    xhr.onload = function(){

        if (this.status === 200) {
            document.querySelector('#loading').style.display = "none";

            var posts = JSON.parse(this.responseText);

            var html = `<h2>Postlar</h2>
                        <div id="loading">
                            <img src="loading.gif" alt="loading_gif">
                        </div>
            `;
            

            posts.forEach(post => {                
                html += `
                <button class="accordion"><i id="title${post.id}">${post.title}</i><span onClick="edit_click(${post.id})">edit</span></button>
                <div class="panel">
                    <p><i id="body${post.id}">${post.body}</i></p>
                </div>
                `;
            });

            document.querySelector('#posts').innerHTML = html;
            activatePosts();
        }
    }
    xhr.send();
}

function reply_click(id) {
    postId = id;
    getPosts(postId);
}

function edit_click(id) {
    var titleId = "#title" + String(id);
    var bodyId = "#body" + String(id);
    titleIn = document.querySelector(titleId).innerHTML;
    bodyIn = document.querySelector(bodyId).innerHTML;
    var html = `
    <h2>Edit</h2>
    <form action="">
    <fieldset>
        <legend>Postu Düzenle:</legend>
        <label for="ftitle">Başlık:</label>
        <input type="text" id="ftitle" name="ftitle" value="${titleIn}"><br><br>
        <label for="fbody">İçerik:</label>
        <textarea id="fbody" name="fbody" rows="10" cols="50">${bodyIn}</textarea><br><br>
        <input type="submit" id="saveBtn" value="Kaydet">
        <input type="submit" id="cancelBtn" value="Vazgeç">
        </fieldset>
    </form>
    `;
    document.querySelector('#edit_block').innerHTML = html;
    document.querySelector("#saveBtn").addEventListener('click', function (e) {
        document.querySelector(titleId).innerHTML = document.querySelector('#ftitle').value;
        document.querySelector(bodyId).innerHTML = document.querySelector('#fbody').value;
        document.querySelector('#edit_block').innerHTML = '';
        e.preventDefault();
    });
    document.querySelector("#cancelBtn").addEventListener('click', function (e) {
        document.querySelector('#edit_block').innerHTML = '';
        e.preventDefault();
    });
    
}