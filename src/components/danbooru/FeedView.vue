<template>
    <div>
        <div class="feedcontrols">
            <a class="btn btn-primary" v-on:click="createFeed(1);">Search</a>
            <a class="btn btn-secondary" v-on:click="createFeed(0);">Prev</a>
            <a class="btn btn-secondary" v-on:click="createFeed(2);">Next</a>
            <a class="btn btn-secondary tagsbtn" v-on:click="switchTagShown()">Tags</a>
            <!--<a class="btn btn-secondary" v-on:click="displayAgainSingle();">Reload</a>-->
            <span>Queue: {{imageQueue.length}}</span>
            <span>Page: {{page}}</span>
            
        </div>
        <div class="feed-grid" v-if="!loading">
            <div v-for="image in imageQueue.slice(displayPerPage*(page-1), displayPerPage*page)" :key="image['id']">
                <a :href="image['file_url']">
                    <img class="img" v-on:error="displayError(image);" :src="getImageURL(image)">
                </a>
            </div>
        </div>
        <div class="loading" v-if="loading">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            <hr>
                Requests: {{requests}}
        </div>
        <div class="feedcontrols-bot" v-if="imageQueue.length>0 && !loading">
            <a class="btn btn-secondary" v-on:click="createFeed(0);">Prev</a>
            <a class="btn btn-secondary" v-on:click="createFeed(2);">Next</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            imageQueue: [],
            realImageQueue: [],
            imagesByTag: {},
            oldestIdByTag: {},
            displayPerPage: 20,
            pageToTag: {},
            alreadyIDs: [],
            qualityByImage: {},
            idToPost: {},
            page: 0,
            loading: false,
            requests: 0
        }
    },
    props: ['tagsList'],
    methods: {
        createFeed: async function(pagechange){
            const url = 'https://danbooru.donmai.us/posts.json';
            this.requests = 0;
            //search 100 images, add to big list, sort by id, display, if images of one search are used up, look for more before the next id of other searches
            //cant work because if display all images in image queue, some will be displayed that are older than what you would get for a new search of another tag
            // maybe search 1 tag, then search next tag for images before id
            // Search #number for every tag, if id of one tag smaller than smallest id of other tag -> search at that tag again for ids greater than smallest, smaller than smallest
            this.loading = true;
            if(pagechange == 1){
                this.page = 1;
            }else if(pagechange == 2){
                this.page++;
                if(this.imageQueue.length >= this.displayPerPage * this.page){
                    this.loading = false;
                    return;
                }
            }else{
                if(this.page != 1){
                    this.page--;
                    if(this.imageQueue.length >= this.displayPerPage * this.page){
                        this.loading = false;
                        return;
                    }
                }
            }

            if(pagechange == 1){
                for (let i = 0; i < this.tagsList.length; i++) {
                    let tagsplit = this.tagsList[i].split(' ');
                    let tags = []
                    let changed = false;
                    for(let j=0; j<tagsplit.length; j++){
                        let tag = await this.makeAdjReq(tagsplit[j]);
                        if(tag != tagsplit[j]){
                            changed = true;
                            
                        }
                        tags.push(tag);
                    }
                    if(changed){
                        this.$emit('changeTag', [i, tags.join(' ')]);
                    }
                }
            }

            let biggestTag = await this.biggestTag(this.tagsList);
            
            while(this.imageQueue.length < this.displayPerPage * this.page){
                await this.searchh(biggestTag, this.displayPerPage, 5, -1); //get from UI maybe
                this.sortQ();
                let oldestPost = this.imageQueue[0]['id'];

                for(let i = 0; i<this.tagsList.length; i++){
                    let tags = this.tagsList[i];
                    if(tags!=biggestTag){
                        await this.searchh(tags, 50, 5, oldestPost); 
                    }
                }
            }
            this.sortQ();
            //this.realImageQueue = this.imageQueue;
            this.loading = false;
        },
        sortQ: function(){
            this.imageQueue.sort((a,b) => b['id']-a['id']);
            for(let i=0; i<this.imageQueue.length; i++){
                this.idToPost[this.imageQueue[i]['id']] = this.imageQueue[i];
            }
        },
        biggestTag: async function(tags){
            let max = 0;
            let maxTag = tags[0];   
            for(let i in tags){
                let min = 9999999999;
                let tagsplit = tags[i].split(' ')
                for(let j in tagsplit){
                    let count = await this.checkTag(tagsplit[j]);
                    if(count < min) min = count;
                }
                if(min > max){
                    max = min;
                    maxTag = tags[i];
                }
            }
            return maxTag;
        },
        searchh: async function(tagso, number, failsafe, afterID){
            tagso = tagso.split(' ');
            const url = 'https://danbooru.donmai.us/posts.json';
            let tags = [];
            for (let i = 0; i < tagso.length; i++) {
                let tag = await this.makeAdjReq(tagso[i]);
                tags.push(tag);
            }
            if(tags.length>2){
                let twotags = [];
                let counts = [];
                let allposts = [];
                let iterations = 0;

                for(let i = 0; i<tags.length; i++){
                    let count = await this.checkTag(tags[i]);
                    counts.push({"name": tags[i], "count": count});
                }
                counts.sort((a,b) => a["count"]-b["count"]);
                twotags = [counts[0]["name"], counts[1]["name"]];

                while((afterID==-1 && (allposts.length < number && iterations < failsafe)) || (afterID>-1 && iterations < 1)){ //either we get 100 or we have to do too many iterations for api to allow us
                    let toPage = 0;
                    if(afterID==-1){
                        this.pageToTag[tagso] = (this.pageToTag[tagso]==null) ? 1 : this.pageToTag[tagso]+1;
                        toPage = this.pageToTag[tagso];
                    }else{
                        toPage = 'a'+afterID;
                    }
                    let aaa = await this.getPosts(url, tags, twotags, toPage, number);
                    aaa.forEach(x => {
                        if(!this.alreadyIDs.includes(x['id'])){
                            allposts.push(x);
                            this.alreadyIDs.push(x['id']);
                        }
                    });
                    iterations++;
                }
                this.imageQueue.push.apply(this.imageQueue, allposts);
                return allposts;
            }else{
                let toPage = 0;
                let allposts = [];
                let iterations = 0;
                if(afterID==-1){
                    this.pageToTag[tagso] = this.pageToTag[tagso]==null?1:this.pageToTag[tagso]+1;
                    toPage = this.pageToTag[tagso];
                }else{
                    toPage = 'a'+afterID;
                }
                while((afterID==-1 && (allposts.length < number && iterations < failsafe)) || (afterID>-1 && iterations < 1)){
                    console.log('Requested: '+'limit='+number+'&page='+toPage+'&tags=' + tags.join(' '));
                    this.requests++;
                    var posts = await fetch(url+'?limit='+number+'&page='+toPage+'&tags=' + tags.join(' '));
                    var data = await posts.json();
                    data.forEach(x => {
                        if(!this.alreadyIDs.includes(x['id']) && x['large_file_url']!=null){
                            allposts.push(x);
                            this.alreadyIDs.push(x['id']);
                        }
                    });
                    iterations++;
                }
                this.imageQueue.push.apply(this.imageQueue, allposts);
                return allposts;
            }
        },
        makeAdjReq: async function(tag){
            var request = await fetch("https://danbooru.donmai.us/tag_aliases.json?search[antecedent_name]="+tag);
            var js = await request.json();
            if(js.length!=0){
                return js[0]["consequent_name"];
            }else{
                return tag;
            }
        },
        checkTag: async function(tag){
            var req = await fetch("https://danbooru.donmai.us/tags.json?search[name]="+tag);
            var js = await req.json();
            return js[0]["post_count"];
        },
        getPosts: async function(url, tags, twotags, nextpage, number){
            console.log('Requested: '+'?limit='+number+'&page='+nextpage+'&tags=' + twotags.join(' '));
            this.requests++;
            var posts = await fetch(url+'?limit='+number+'&page='+nextpage+'&tags=' + twotags.join(' '));
            var psts = await posts.json();
            var allposts = [];
            
            for(const post in psts){
                var tagsofpost = psts[post]['tag_string'].split(' ');
                var notin = false;
                tags.forEach(tag => {
                    if(!tagsofpost.includes(tag)){
                        notin = true;
                    }
                });
                if(!notin && psts[post]['large_file_url']!=null){
                    allposts.push(psts[post]);
                }
            }
            return allposts;
        },
        getImageURL: function(post){
            //let post = this.idToPost[id];
            this.qualityByImage[post['id']] = 1;
            return this.getQual(post, this.qualityByImage[post['id']]);
        },
        displayError: function(post){
            //let post = this.idToPost[id];
            if(this.qualityByImage[post['id']] == 1){
                this.qualityByImage[post['id']] = 2;
                return this.getQual(post, 2)
            }else{
                this.qualityByImage[post['id']] = 0;
                return this.getQual(post, 0)
            }
        },
        getQual: function(post, qual){
            if(qual == 0){
                return post['large_file_url'];
            }else if(qual == 2){
                return post['file_url'];
            }else{
                return post['preview_file_url'];
            }
        },
        switchTagShown: function(){
            this.$emit('tagSwitch');
        }
    }
}
</script>

<style>
    @import url('../../assets/css/dan.css');
</style>