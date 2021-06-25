<template>
    <div class="compcontent row fitFull">
        <div ref="rightbar" class="rightbar col-lg-4 col-md-4 col-sm-0 col-xl-2" v-bind:class="{rightbarshown: tagShown}">
            <div class="input-group">
                <input class="form-control" type="text" id="tagstoadd" v-model="tagstoadd">
                <div class="input-group-append">
                    <a class="btn btn-outline-secondary search-btn" v-on:click="addTags(tagstoadd.trim());" id="addbtn">Add</a>
                </div>
            </div>
            <ul id="tagslist">
                <li v-for="tag of tagsList" :key="tag">{{tag}}<a v-on:click="removeTag(tag)" class="removeTag">x</a></li>
            </ul>
        </div>
        <div class="feed col-md-8 col-sm-12 col-lg-8 col-xl-10">
            
            <!--<a id="aaa" :href="currentimg['file_url']">
                <img v-if="currentimg != []" class="img" v-on:error="displaycurrentSingle();" id="iimmgg" src="../../assets/PreviewDan.jpg">
                <img class="img" v-on:error="displaycurrentSingle();" id="iimmgg" :src="currentimg[quality]">
            </a>-->
            <FeedView ref="feed" :tagsList="tagsList" v-on:tagSwitch="tagSwitch()" v-on:changeTag="changeTag"></FeedView>
            <div class="infos">
                <div id="tagsinfo">
                    <div v-if="'normaltags' in postinfo.tags">
                        <span style="color: blue; padding-left: .3rem">{{postinfo.tags.normaltags}}</span>
                        <span style="color: red; padding-left: .3rem">{{postinfo.tags.character}}</span>
                        <span style="color: #baad03; padding-left: .3rem">{{postinfo.tags.artist}}</span>
                        <span style="color: green; padding-left: .3rem">{{postinfo.tags.copyright}}</span>
                    </div>
                    <div v-else>
                        <span>{{postinfo.tags.nocolor}}</span>
                    </div>
                </div>
                <div id="uploadedinfo">{{postinfo.uploaded}}</div>
                <div id="idid">{{postinfo.id}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import FeedView from './FeedView';

export default {
    components: {
        FeedView
    },
    data() {
        return{
            tagstoadd: '',
            poststream: [],
            page: 0,
            currentimg: [],
            paststream: [],
            oldTags: [],
            pageToTag: {},
            alreadyIDs: [],
            tagsList: [],
            postinfo: {tags: {}, uploaded: '', id: ''},
            quality: '',
            tagShown: this.$store.state.tagShown
        }
    },
    methods: {
        getTagslist: function(){
            let tagsstring = this.$route.query.s
            let tagslist = tagsstring!=null&&tagsstring!=''?tagsstring.split('|'):[];
            return tagslist;
        },
        updateQuery: function(){
            this.tagsList.forEach(element => {
                element = element.replaceAll(' ', '+');
            });
            let tagstring = this.tagsList.join('|');
            
            //window.location.search = '?s='+tagstring;
            const query = {};
            let curpath = this.$route.path;
            Object.assign(query, this.$route.query);
            query.s = tagstring;
            this.$router.push({
                path: curpath,
                query,
            });
        },
        addTags: function(tagstoadd){
            //let tagslist = this.getTagslist();
            this.tagsList.push(tagstoadd);
            this.updateQuery();
            this.tagstoadd = '';
        },
        searchComp: async function(){
            if(JSON.stringify(this.oldTags) != JSON.stringify(this.tagsList)){ //tagslist changed
                this.poststream = [];
                this.paststream = [];
                this.currentimg = [];
            }
            if(this.poststream.length<2){ //need more cuz poststream is low
                this.oldTags = this.tagsList;
                this.quality = 'testa'
                for(let i = 0; i<this.tagsList.length; i++){
                    this.quality += 't'
                    await this.searchh(this.tagsList[i], true);
                    this.quality += 'a'
                }
                this.quality = 'test0'
                this.poststream = this.shuffleArray(this.poststream);
                this.quality = 'test1'
            }
            this.quality = 'test2'
            let img = this.poststream.pop();
            if('id' in img){
                this.currentimg = img
                this.quality = 'large_file_url';
                this.paststream.push(this.currentimg);
                this.writeInfos(this.currentimg);
            }else{
                await this.searchComp();
            }
        },
        shuffleArray: function(arr) {
            arr.sort((a,b) => a['id']-b['id']);
            return arr;
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
        getPosts: async function(url, tags, twotags, nextpage){
            var posts = await fetch(url+'?limit=10&page='+nextpage+'&tags=' + twotags.join(' '));
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
                if(!notin){
                    allposts.push(psts[post]);
                }
            }
            return allposts;
        },
        searchh: async function(tagso, multimode){
            tagso = tagso.split(' ');
            const url = 'https://danbooru.donmai.us/posts.json';
            let tags = [];
            for (let i = 0; i < tagso.length; i++) {
                var tag = await this.makeAdjReq(tagso[i]);
                tags.push(tag);
            }
            if(tags.length>2){
                var twotags = [];
                var counts = [];
                //var twotags = [tags[0], tags[1]]; //get tags that are smallest for smaller intersection
                for(let i = 0; i<tags.length; i++){
                    var count = await this.checkTag(tags[i]);
                    counts.push({"name": tags[i], "count": count});
                }
                counts.sort((a,b) => a["count"]-b["count"]);
                twotags = [counts[0]["name"], counts[1]["name"]];
                var allposts = []
                while(allposts.length < 5){
                    let toPage = 0;
                    if(multimode){
                        this.pageToTag[tagso] = this.pageToTag[tagso]==null?1:this.pageToTag[tagso]+1;
                        toPage = this.pageToTag[tagso];
                    }else{
                        this.page = this.page+1;
                        toPage = this.page
                    }
                    var aaa = await this.getPosts(url, tags, twotags, toPage);
                    aaa.forEach(x => {
                        if(!this.alreadyIDs.includes(x['id'])){
                            allposts.push(x);
                            this.alreadyIDs.push(x['id']);
                        }
                    });
                    //allposts.push.apply(allposts, aaa);
                }
                this.poststream.push.apply(this.poststream, allposts);
                //display(allposts);
            }else{
                let toPage = 0;
                if(multimode){
                    this.pageToTag[tagso] = this.pageToTag[tagso]==null?1:this.pageToTag[tagso]+1;
                    toPage = this.pageToTag[tagso];
                }else{
                    this.page = this.page+1;
                    toPage = this.page
                }
                let prevPost = this.poststream.length;
                while(this.poststream.length<prevPost+3){
                    var posts = await fetch(url+'?limit=5&page='+toPage+'&tags=' + tags.join(' '));
                    var data = await posts.json();
                    //poststream.push.apply(poststream, data);
                    data.forEach(x => {
                        if(!this.alreadyIDs.includes(x['id'])){
                            this.poststream.push(x);
                            this.alreadyIDs.push(x['id']);
                        }
                    });
                }
            }
        },
        displayAgainSingle: function(){
            this.quality = 'file_url';
        },
        displaycurrentSingle: function(){
            if(this.quality == 'large_file_url'){
                this.quality = 'file_url';
            }else{
                this.quality = 'preview_file_url';
            }
        },
        displayprevSingle: function(){
            if(this.paststream.length>0){
                let pastimg = this.paststream.pop();
                if(pastimg == this.currentimg){
                    pastimg = this.paststream.pop();
                    this.poststream.push(this.currentimg);
                    this.paststream.push(pastimg);
                    this.quality = 'large_file_url';
                    this.currentimg = pastimg;
                }
            }
        },
        writeInfos: function(post){
            this.postinfo.tags = {};
            this.postinfo.uploaded = '';
            this.postinfo.id = '';
            let coloredtags = ('tag_string_general' in post);
            let tags = post['tag_string'].split(' ');
            if(coloredtags){
                this.postinfo.tags.normaltags = post['tag_string_general'];
                this.postinfo.tags.character = post['tag_string_character'];
                this.postinfo.tags.artist = post['tag_string_artist'];
                this.postinfo.tags.copyright = post['tag_string_copyright'];
            }else{
                this.postinfo.tags.nocolor = tags
            }
            this.postinfo.uploaded = post['created_at'];
            this.postinfo.id = post['id'];
        },
        tagSwitch: function(){
            this.$store.commit('switchTagShown');
            this.tagShown = this.$store.state.tagShown;
        },
        removeTag: function(tag){
            this.tagsList.splice(this.tagsList.findIndex((x) => x==tag), 1)
            this.updateQuery();
        },
        changeTag: function(newtag){
            //this.tagsList[newtag[0]] = newtag[1];
            this.$set(this.tagsList, newtag[0], newtag[1])
            this.updateQuery();
        }
    },
    mounted() {
        this.tagsList = this.getTagslist();
    }
}
</script>

<style>
    @import url('../../assets/css/dan.css');
</style>