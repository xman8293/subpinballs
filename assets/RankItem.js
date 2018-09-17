cc.Class({
    extends: cc.Component,
    properties: {
        rank: cc.Label,
        ImgSprite: cc.Sprite,
        nickname: cc.Label,
        score: cc.Label,
    },
    start() {
        this.node.setCascadeOpacityEnabled(false);
    },
    init: function (rank, data) {
        let avatarUrl = data.avatarUrl;
        let nick = data.nickname;
        this.rank.string = (rank + 1).toString();
        this.nickname.string = nick;
        this.score.string=data.KVDataList[0].value
        this.createImage(avatarUrl);
    },
    createImage(avatarUrl) {
        if (window.wx != undefined) {
            try {
                let image = wx.createImage();
                image.onload = () => {
                    try {
                        let texture = new cc.Texture2D();
                        texture.initWithElement(image);
                        texture.handleLoadedTexture();
                        this.ImgSprite.spriteFrame = new cc.SpriteFrame(texture);
                    } catch (e) {
                        this.ImgSprite.node.active = false;
                    }
                };
                if(avatarUrl){
                    image.src = avatarUrl;
                }else{
            }
            }catch (e) {
            }
        } else {
            cc.loader.load({
                url: avatarUrl, type: 'jpg'
            }, (err, texture) => {
                this.ImgSprite.spriteFrame = new cc.SpriteFrame(texture);
            });
        }
    }

});
