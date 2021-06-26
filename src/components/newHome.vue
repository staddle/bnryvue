<template>
    <div class="container-fluid fitFull">
        <div class="alert alert-info alerttop col-lg-3 col-md-4" role="alert" v-if="alertShown">
            <div class="row">
                <div class="col-11">   
                    <router-link :to="alertLink" class="alertlink">
                        <prismic-rich-text :field="alert"></prismic-rich-text>
                    </router-link>
                </div> 
                <div class="col-1">
                    <a class="alert-close" v-on:click="alertSwitch()" href="#"><font-awesome-icon icon="times"></font-awesome-icon></a>
                </div>
            </div>
        </div>
        
        <span id="anchor-top-mid" class="fixed-mid"></span>
        <div class="row">
            <div class="width-100 vertical-center">
                <div class="col-before"></div>
                <div id="triggerName" ref="triggerName" class="maindiv">
                    <div id="bigName" ref="bigName" class="links-header">staddle</div>
                    <div>
                        <hr id='divider1' class="divider">
                        <ul id="links-list" class="links-list flex-content" scroll="handleScroll">
                            <li class="links-list-item">
                                <a class="links-link links-link-twitter" href="https://twitter.com/staddle_">>&#8239;twitter</a>
                            </li>
                            <li class="links-list-item">
                                <a class="links-link links-link-twitch" href="https://twitch.tv/staddle_">>&#8239;twitch</a>
                            </li>
                            <li class="links-list-item">
                                <a class="links-link links-link-github" href="https://github.com/staddle">>&#8239;github</a>
                            </li>
                            <li class="links-list-item">
                                <a class="links-link links-link-osu" href="https://osu.ppy.sh/users/9329597">>&#8239;osu!</a>
                            </li>
                            <li class="links-list-item">
                                <a class="links-link links-link-steam" href="https://steamcommunity.com/id/staddle/">>&#8239;steam</a>
                            </li>
                            <li class="links-list-item">
                                <a class="links-link links-link-youtube" href="https://www.youtube.com/channel/UCiYBRlAdcUNSnBbCSgkamkA">>&#8239;youtube</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-before"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    @import url('../assets/css/mew.css');
</style>