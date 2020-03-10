<template>
    <div class="container-fluid">
        <div class="row">
            <div class="width-100 vertical-center">
                <div class="col-before"></div>
                <div class="maindiv">
                    <div class="links-header">staddle</div>
                    <div>
                        <hr class="divider">
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
        <div class="testbig"></div>
    </div>
</template>

<script>
export default {
    methods: {
        handleScroll: function (evt, el){
            updateScroll(evt, el);
        }
    }
}

function updateScroll(evt, el){
    var wid = el.clientWidth;
    var top = el.scrollTop;
    var mod = wid / 1300;
    var topadj = top / mod;
    var pageratio = wid / window.innerHeight;

    var scaledYPos = top;
    var ratioYScalar = 1;
    var threshholdYScalar = 0.96;
    
    if(pageratio < 1.0)
    {
        // skinny
        ratioYScalar = 0.65 * ((pageratio + 0.4) / pageratio);
        threshholdYScalar += 0.125 * (0.05 / pageratio);
    }
    else
    {
        // wide
        ratioYScalar = 1.0 - (0.1*pageratio);
        threshholdYScalar -= 0.35 * (0.15 / pageratio);
    }
    
    scaledYPos = -(topadj * mod / 100) * ratioYScalar;
    print(evt);
    el.setAttribute(
        'style',
        'opacity: ' + scaledYPos/100 + ';'
    )
}
</script>

<style>

</style>