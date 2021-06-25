var poststream = [];
var page = 0;
var currentimg = [];
var paststream = [];
var oldTags = [];
var pageToTag = {};
var alreadyIDs = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function displaynext(tags) {
    if(poststream.length == 0){
        page=0;
    }
    if(poststream.length>1){
        currentimg = poststream.shift();
        display(currentimg, tags, 1);
        paststream.push(currentimg);
    }else{
        await searchh(tags);
        document.getElementById("pagenmb").innerText = page;
        currentimg = poststream.shift();
        display(currentimg, tags, 1);
        paststream.push(currentimg);
    }
    document.getElementById("queuec").innerText = poststream.length;
}

function displayprev(tags){
    if(paststream.length>0){
        currentimg = paststream.pop();
        display(currentimg, tags, 1);
        poststream.shift(currentimg);
    }
}

function displaycurrent(){
    //await sleep(2000);
    display(currentimg, [], -1);
}

function display(data, tags, qual) {
    //console.log("displaying image");
    if(!('id' in data)){
        /*var pixivurl = 'https://i.pximg.net/img-master/img/2020/11/16/18/29/55/85710553_p0_master1200.jpg'
        var link = document.createElement('a');
        var src = data['source'];
        src = src.replace("original", "master");
        src = src.replace(".jpg", "_master1200.jpg");
        src = src.replace(".png", "_master1200.png");
        link.href = src;
        var img = document.createElement('img');
        img.classList.add("img");
        img.src = src;;
        link.appendChild(img);
        cont.appendChild(link);*/
        displaynext(tags);
    }else{
        var link = document.getElementById("aaa");
        link.href = data['file_url'];
        var img = document.getElementById("iimmgg");
        if(qual==1){
            img.src = data['large_file_url'];
        }else if(qual==2){
            img.src = data['file_url'];
        }else{
            img.src = data['preview_file_url'];
        }
        writeInfos(data);
    }
}

function writeInfos(post){
    let tagsdiv = document.getElementById("tagsinfo");
    let uploadeddiv = document.getElementById("uploadedinfo");
    let iddiv = document.getElementById("idid");
    tagsdiv.innerHTML = '';
    uploadeddiv.innerHTML = '';
    iddiv.innerHTML = '';
    let coloredtags = ('tag_string_general' in post);
    let tags = post['tag_string'].split(' ');
    //tags
    if(coloredtags){
        let normaltags = post['tag_string_general'].split(' ');
        let character = post['tag_string_character'].split(' ');
        let artist = post['tag_string_artist'].split(' ');
        let copyright = post['tag_string_copyright'].split(' ');
        normaltags.forEach(element => {
            appendTag(element, tagsdiv, 'blue');
        });
        character.forEach(element => {
            appendTag(element, tagsdiv, 'red');
        });
        artist.forEach(element => {
            appendTag(element, tagsdiv, '#baad03');
        });
        copyright.forEach(element => {
            appendTag(element, tagsdiv, 'green');
        });
    }else{
        tags.forEach(tag => {
            let span = document.createElement('span');
            span.innerText = tag + ' ';
            tagsdiv.appendChild(span);
        });
    }
    /*let uploadedspan = document.createElement('span');
    uploadedspan.innerText = post['created_at'];
    uploadeddiv.appendChild(uploadedspan);*/
    let idspan = document.createElement('span');
    idspan.innerText = post['id'];
    iddiv.appendChild(idspan);
}

function appendTag(tag, div, color){
    let span = document.createElement('span');
    span.style.color = color;
    span.innerText = tag+' ';
    div.appendChild(span);
}

async function searchh(tagso, multimode) {
    //var currentpage = document.getElementById("page").value;
    //var nextpage = Number(currentpage) + Number(page);
    //document.getElementById("page").value = nextpage;
    //console.log(nextpage);
    tagso = tagso.split(' ');
    const url = 'https://danbooru.donmai.us/posts.json';
    var tags = await adjName(tagso);
    if(tags.length>2){
        var twotags = [];
        var counts = [];
        //var twotags = [tags[0], tags[1]]; //get tags that are smallest for smaller intersection
        for(let i = 0; i<tags.length; i++){
            var count = await checkTag(tags[i]);
            counts.push({"name": tags[i], "count": count});
        }
        counts.sort((a,b) => a["count"]-b["count"]);
        twotags = [counts[0]["name"], counts[1]["name"]];
        //console.log(counts);
        var allposts = []
        while(allposts.length < 5){
            let toPage = 0;
            if(multimode){
                pageToTag[tagso] = pageToTag[tagso]==null?1:pageToTag[tagso]+1;
                toPage = pageToTag[tagso];
            }else{
                page=page+1;
                toPage = page
            }
            //console.log("checking next posts: Page "+toPage);
            var aaa = await getPosts(url, tags, twotags, toPage);
            aaa.forEach(x => {
                if(!alreadyIDs.includes(x['id'])){
                    allposts.push(x);
                    alreadyIDs.push(x['id']);
                }
            });
            //allposts.push.apply(allposts, aaa);
        }
        poststream.push.apply(poststream, allposts);
        //display(allposts);
    }else{
        let toPage = 0;
        if(multimode){
            pageToTag[tagso] = pageToTag[tagso]==null?1:pageToTag[tagso]+1;
            toPage = pageToTag[tagso];
        }else{
            page=page+1;
            toPage = page
        }
        let prevPost = poststream.length;
        while(poststream.length<prevPost+3){
            var posts = await fetch(url+'?limit=5&page='+toPage+'&tags=' + tags.join(' '));
            var data = await posts.json();
            //poststream.push.apply(poststream, data);
            data.forEach(x => {
                if(!alreadyIDs.includes(x['id'])){
                    poststream.push(x);
                    alreadyIDs.push(x['id']);
                }
            });
        }
    }
    //console.log(alreadyIDs);
}

async function getPosts(url, tags, twotags, nextpage){
    var posts = await fetch(url+'?limit=10&page='+nextpage+'&tags=' + twotags.join(' '));
    var psts = await posts.json();
    //console.log(psts);
    var allposts = [];
    
    for(const post in psts){
        var tagsofpost = psts[post]['tag_string'].split(' ');
        var notin = false;
        tags.forEach(tag => {
            if(!tagsofpost.includes(tag)){
                notin = true;
                //console.log('Tags: ' + tagsofpost.join(', ') + ': missing: '+tags[tag]);
            }
        });
        if(!notin){
            allposts.push(psts[post]);
        }
    }
    return allposts;
}

async function adjName(tagslist){
    var ntl = [];
    for (let i = 0; i < tagslist.length; i++) {
        var tag = await makeAdjReq(tagslist[i]);
        ntl.push(tag);
    }
    return ntl;
}
        
async function makeAdjReq(tag){
    var request = await fetch("https://danbooru.donmai.us/tag_aliases.json?search[antecedent_name]="+tag);
    var js = await request.json();
    if(js.length!=0){
        return js[0]["consequent_name"];
    }else{
        return tag;
    }
}

async function checkTag(tag){
    var req = await fetch("https://danbooru.donmai.us/tags.json?search[name]="+tag);
    var js = await req.json();
    return js[0]["post_count"];
}



//COMP

async function fillrightbar(){
    let tagslist = getTagslist();
    let listdiv = document.getElementById("tagslist");
    tagslist.forEach(x => {
        if(x != ''){
            let li = document.createElement("li");
            li.innerText = x;
            //li.onmouseenter = function() {this.children[0].style.display = "block";};
            //li.setAttribute("onmouseenter", "this.children[0].style.display = 'inline-block';")
            //li.onmouseleave = function() {this.children[0].style.display = "none";};
            //li.setAttribute("onmouseleave", "this.children[0].style.display = 'none';")
            let closea = document.createElement("a");
            closea.innerText = "x"
            closea.onclick = function() { removeTag(this.parentElement); };
            closea.style.display = "inline-block";
            closea.style.paddingLeft = ".5rem";
            closea.style.cursor = 'pointer';
            closea.style.color = 'red';
            closea.style.fontWeight = '600';
            li.appendChild(closea);
            listdiv.appendChild(li);
        }
    });
}

function removeTag(li){
    let tagsToRemove = li.innerText.slice(0, li.innerText.length-1);
    let tagslist = getTagslist();
    let newlist = [];
    tagslist.forEach(element => {
        if(element != tagsToRemove){
            newlist.push(element);
        }
    });
    makeToQuery(newlist);
}

function getTagslist(){
    let params = new URLSearchParams(window.location.search);
    let tagsstring = params.get('s');
    let tagslist = tagsstring!=null?tagsstring.split('|'):[];
    return tagslist;
}

export function addTags(tagstoadd){
    let tagslist = getTagslist();
    tagslist.push(tagstoadd);
    makeToQuery(tagslist);
}

function makeToQuery(tagslist){
    tagslist.forEach(element => {
        element = element.replaceAll(' ', '+');
    });
    let tagstring = tagslist.join('|');
    window.location.search = '?s='+tagstring;
}

export async function searchComp(){
    let tagslist = getTagslist();
    if(JSON.stringify(oldTags) != JSON.stringify(tagslist)){
        //console.log(oldTags);
        //console.log(tagslist);
        poststream = [];
        paststream = [];
        currentimg = [];
        //console.log("tagslist changed, removing all");
    }
    if(poststream.length<2){
        //console.log("need more cuz poststream is low: "+poststream.length);
        oldTags = tagslist;
        for(let i = 0; i<tagslist.length; i++){
            await searchh(tagslist[i], true);
        }
        poststream = shuffleArray(poststream);
        //console.log(poststream);
        currentimg = poststream.pop();
        displaySingle(currentimg, 1);
        paststream.push(currentimg);
    }else{
        currentimg = poststream.pop();
        displaySingle(currentimg, 1);
        paststream.push(currentimg);
    }
    //console.log(pageToTag);
    document.getElementById("queuec").innerText = poststream.length;
}

function displaySingle(data, qual){
    if(!('id' in data)){
        /*var pixivurl = 'https://i.pximg.net/img-master/img/2020/11/16/18/29/55/85710553_p0_master1200.jpg'
        var link = document.createElement('a');
        var src = data['source'];
        src = src.replace("original", "master");
        src = src.replace(".jpg", "_master1200.jpg");
        src = src.replace(".png", "_master1200.png");
        link.href = src;
        var img = document.createElement('img');
        img.classList.add("img");
        img.src = src;
        link.appendChild(img);
        cont.appendChild(link);*/
        searchComp();
    }else{
        var link = document.getElementById("aaa");
        link.href = data['file_url'];
        var img = document.getElementById("iimmgg");
        if(qual==1){
            img.src = data['large_file_url'];
            img.setAttribute('qual', '1');
        }else{
            if(qual==2){
                img.src = data['file_url'];
                img.setAttribute('qual', '2');
            }else{
                if(img.getAttribute('qual')=='1'){
                    img.src = data['file_url'];
                    img.setAttribute('qual', '2');
                }else if(img.getAttribute('qual')=='2'){
                    img.src = data['preview_file_url'];
                    img.setAttribute('qual', '0');
                }
            }
        }
        writeInfos(data);
    }
}

export function displayprevSingle(){
    if(paststream.length>0){
        let pastimg = paststream.pop();
        if(pastimg == currentimg){
            pastimg = paststream.pop();
            displaySingle(pastimg, 1);
            poststream.push(currentimg);
            paststream.push(pastimg);
            currentimg = pastimg;
        }else{
            //console.log("irgendwas is hier anders");
        }
        document.getElementById('queuec').innerText = poststream.length;
    }
}

function displaycurrentSingle(){
    //await sleep(2000);
    displaySingle(currentimg, -1);
}

export function displayAgainSingle(){
    displaySingle(currentimg, 2);
}

function shuffleArray(arr) {
    arr.sort((a,b) => a['id']-b['id']);
    return arr;
}