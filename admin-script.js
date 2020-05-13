//Global Variables
var url = "https://jsonplaceholder.typicode.com";

document.querySelector('#userGetAll').addEventListener('click', getAllPosts);

function callLoading() {
    document.querySelector('#posts').innerHTML = `<h2>Postlar</h2>
                                                    <div id="loading">
                                                        <img src="loading.gif" alt="loading_gif">
                                                    </div>
                                                `;
}

function activatePosts() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        /**
         * TO DO
         * kodun buradan gerisini css ile cozebiliriz, uzerine konusalim
         * genel olarak eger bir ihtiyac css ile cozuluyorsa ui icin js kullanmamak best practice'tir
         * 
         * dip not: cool animasyon
         */
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
    postUrl = url + "/posts";
    var xhr = new XMLHttpRequest();
    
    callLoading();
    
    xhr.open('GET', postUrl, true);
    xhr.onload = function(){

        if (this.status === 200) {

            var posts = JSON.parse(this.responseText);

            var html = '<h2>Postlar</h2>';
            

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
    let postUrl = url + "/posts?userId=";
     /**
     * TO DO
     * url degiskenini iki yerde de kullanmisiz ama aslinda bazlari ayni, 
     * bunu global tek bir degisken olarak tanimlayip userId gibi paremetleri ustune ekleyerek kullanirsak daha seksi olur.
     */
    postUrl += String(idItem);
    var xhr = new XMLHttpRequest();

    /**
     * TO DO
     * loading htmllerini bir cok kez tek tekrarlamisiz o yuzden bir fonksiyondan gelse daha tatli olur.
     * ya da html tarafinda bunu sabit birakip postlari ayri bir elementin icerisine alip oraya yazdirabiliriz.
     */

    callLoading();

    xhr.open('GET', postUrl, true);
    xhr.onload = function(){

        if (this.status === 200) {

            var posts = JSON.parse(this.responseText);

            var html = '<h2>Postlar</h2>';
            

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

function reply_click(postId) {
    /**
     * TO DO
     * burada fazladan postId degiskenini tanimlamak yerine direk id'yi kullanabiliriz, 
     * okunabilirlik icin yaptiysak fonksiyon parametresine direk postId adini verebiliriz.
     */
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