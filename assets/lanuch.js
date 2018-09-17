
cc.Class({
    extends: cc.Component,

    properties: {
        scrollViewContent: cc.Node,
        prefabRankItem: cc.Prefab,
        selfItem: cc.Node,
    },
    start () {
        if (window.wx != undefined) {
            window.wx.onMessage(data => {
               if (data.messageType == 1) {
                this.submitScore(data.KEY1, data.score);
                }else if(data.messageType == 2) {
                    this.fetchFriendData(data.KEY1)
                }
            });
        }
    },
    submitScore(KEY1,score) { 
        if (window.wx != undefined) {
            window.wx.getUserCloudStorage({
                keyList: [KEY1],
                success: function (getres) {
                    if (getres.KVDataList.length != 0) {
                        if (getres.KVDataList[0].value > score) {
                            return;
                        }
                    }
                    window.wx.setUserCloudStorage({
                        KVDataList: [{key: KEY1, value: "" + score}],
                        success: function (res) {
                            console.log("提交成功")
    
        
                        },
                        fail: function (res) {
                            console.log("提交成功")
  
                        },
                        complete: function (res) {
                            console.log("提交成功")

                        }
                    });
                },
                fail: function (res) {
  
                },
                complete: function (res) {

                }
            });
        }
    },
    fetchFriendData(KEY1) {
        var self=this
        this.scrollViewContent.removeAllChildren()
        if (window.wx != undefined) {
            wx.getUserInfo({
                openIdList: ['selfOpenId'],
                success: (userRes) => {
                    let userData = userRes.data[0];
                    wx.getFriendCloudStorage({
                        keyList: [KEY1],
                        success: res => {
                            let data = res.data;
                            data.sort((a, b) => {
                                if (a.KVDataList.length == 0 && b.KVDataList.length == 0) {
                                    return 0;
                                }
                                if (a.KVDataList.length == 0) {
                                    return 1;
                                }
                                if (b.KVDataList.length == 0) {
                                    return -1;
                                }
                                return b.KVDataList[0].value - a.KVDataList[0].value;
                            });
                            var count=0
                            if(data.length<=50){
                                count=data.length
                            }else{count=50}
                            for (let i = 0; i < count; i++) {
                                var playerInfo = data[i];
                                var item = cc.instantiate(self.prefabRankItem);
                                item.getComponent('RankItem').init(i, playerInfo);
                                self.scrollViewContent.addChild(item);
                                if (data[i].avatarUrl == userData.avatarUrl) {
                                    let userItem = self.selfItem
                                    userItem.getComponent('RankItem').init(i, playerInfo);
                                }
                            }
                        },
                        fail: res => {
                        },
                    });
                },
                fail: (res) => {
                }
            });
        }
    },
})
