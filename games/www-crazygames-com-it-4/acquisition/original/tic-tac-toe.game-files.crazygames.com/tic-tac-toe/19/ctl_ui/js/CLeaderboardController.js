class CLeaderboardController{
    
    constructor(oController){
        
        this._oGUIController = oController;
        
        this.BADGE_OFFSET = [
                                            0,200,300,400,500, //RANK COPPER
                                            600,700,800,900,1000, //RANK BRONZE
                                            1200,1400,1600,1800,2000, //RANK SILVER
                                            2200,2400,2600,2800,3000, //RANK GOLD
                                            3200,3400,3600,3800,4000, //RANK PLATINUM
                                            4200,4400,4600,4800,5000, //RANK EMERALD
                                            5200,5400,5600,5800,6000, //RANK DIAMOND
                                            6200,6400,6600,6800,7000, //RANK CHAMPION
                                            10000
                            ];

        this.WIN_POINTS = [25, 25, 25, 25,25,
                                20,20,20,20,20,
                                20, 20,20,20,20,
                                15, 15,15,15,15,
                                10, 10,10,10,10,
                                10,10,10,10,10,
                                10, 10,10,10,10,
                                10, 10,10,10,10,
                                10 ];
        
        this._aPlayerPos = [];
        
        this.LEADERBOARD_GROUP_ID = "ranking";
        this.NUM_TOP_PLAYERS = 3;
        this.NUM_LEADERBOARD_ROWS = 8;
        this.LEADERBOARD_DAY = 0;
        this.LEADERBOARD_MONTH = 1;
        this.LEADERBOARD_GENERAL = 2;
        
        
        this._aLeaderboard = [];
        this._aLeaderboard[this.LEADERBOARD_DAY] = [];
        this._aLeaderboard[this.LEADERBOARD_MONTH] = [];
        this._aLeaderboard[this.LEADERBOARD_GENERAL] = [];
        
        this._iCurLeaderboardToShow = this.LEADERBOARD_GENERAL;
        
        this._iAmountBadges = this.BADGE_OFFSET.length;
        
    }
    
    getLeaderboardEntries(){
        if(!s_oNetworkManager.isLogged()){
            this._oGUIController.__createGeneralAlertModal(TEXT_PLS_LOGIN);
            return;
        }

        switch(this._iCurLeaderboardToShow){
            case this.LEADERBOARD_GENERAL:{
                    this.onSelectLeaderboardGeneral();
                    break;
            }
            case this.LEADERBOARD_MONTH:{
                    this.onSelectLeaderboardMonthly();
                    break;
            }
            case this.LEADERBOARD_DAY:{
                    this.onSelectLeaderboardDaily();
                    break;
            }
        }
        
    };
    
    _getTimeInterval(iBoardID){
        let oDate = new Date();
        
        var szTimeInterval;
        switch(iBoardID){
            case this.LEADERBOARD_MONTH:{
                    var oDayDate = oDate.toISOString().split('T')[0];
                    var aTmp = oDayDate.split("-");
                    szTimeInterval = aTmp[0]+"-"+aTmp[1];
                    break;
            }
            case this.LEADERBOARD_DAY:{
                    szTimeInterval = oDate.toISOString().split('T')[0];
                    break;
            }
            default :{
                    szTimeInterval = null;
                    break;
            }
        }
        
        return szTimeInterval;
    }
    
    async _buildLeaderboard(iTypeLeaderboard){
        var oPromise = new Promise((resolve,reject)=>{
            
            var szTimeInterval = this._getTimeInterval(iTypeLeaderboard);

            var iNumLastPlayers = this.NUM_LEADERBOARD_ROWS - this.NUM_TOP_PLAYERS;
            
            this.getLeaderboardTopRankings(szTimeInterval,0,this.NUM_TOP_PLAYERS).then((oRet)=>{
                for(var k=0;k<oRet.length;k++){
                    var oEntry = this.parseLeaderboardEntry(oRet[k]);
                    this._aLeaderboard[iTypeLeaderboard][k] = oEntry;
                }
                
                var iPlayerRank = this._aPlayerPos[iTypeLeaderboard].rank;
                if(iPlayerRank<=this.NUM_TOP_PLAYERS){
                    //GET POSITION 4 -> LAST ROW
                    this.getLeaderboardTopRankings(szTimeInterval,3,iNumLastPlayers).then((oRet)=>{
                        for(var k=0;k<oRet.length;k++){
                            this._aLeaderboard[iTypeLeaderboard][k+3] = this.parseLeaderboardEntry(oRet[k]);
                        }
                        resolve();
                    });
                }else{
                    //GET PLAYER NEIGHBOURS
                    this.getLeaderboardNeighbourRanking(szTimeInterval,-2,iNumLastPlayers).then((oRet)=>{
                        for(var k=0;k<oRet.length;k++){
                            this._aLeaderboard[iTypeLeaderboard][k+3] = this.parseLeaderboardEntry(oRet[k]);
                        }
                        resolve();
                    });
                }
                
                
            }).catch((evt)=>{
                reject();
            });
        });

        return await oPromise; 
    };
    
    __createLeaderboardDialog(iTypeLeaderboard,bAnimate){

        var szHtml = '<div class="modal fade more-games-box overflow-hidden" id="leaderboardModal" tabindex="-1" aria-labelledby="leaderboardModalLabel" aria-hidden="true">';
        szHtml += '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">';
        szHtml += '<div class="modal-content leaderboard-container animate__animated animate__fadeInUpBig">';
        szHtml += '<div class="modal-header">';
        szHtml += '<i class="header-leaderboard-icon fa-solid fa-ranking-star"></i>';
        szHtml += '<h1 id="leaderboard-title" class="modal-title header-leaderboard-title text-end">'+TEXT_LEADERBOARD+'</h1>';
        szHtml += '<button type="button" class="btn-close btn-close-white align-self-start" data-bs-dismiss="modal" aria-label="Close"></button>';
        szHtml += '</div>';
        szHtml += '<div class="modal-body">';
        szHtml += '<table class="table">';
        szHtml += '<thead class=""><tr>';
        szHtml += '<th class="text-center leaderboard-level" id="table-title-col-1" scope="col">'+TEXT_POSITION+'</th>';
        szHtml += '<th class="text-center leaderboard-rank" id="table-title-col-2" scope="col">'+TEXT_RANK+'</th>';
        szHtml += '<th class="text-center leaderboard-nickname" id="table-title-col-3" scope="col">'+TEXT_NICKNAME+'</th>';
        szHtml += '<th class="text-center leaderboard-points" id="table-title-col-4" scope="col">'+TEXT_POINTS+'</th>';
        szHtml += '</tr></thead>';
        szHtml += '<tbody class="top-players-container">';

        szHtml += this._refreshLeaderboardTopPlayer(iTypeLeaderboard);
        
        szHtml += '</tbody><tbody class="last-players-container">';

        szHtml += this._refreshLeaderboardLastPlayer(iTypeLeaderboard);
        
        szHtml += '<tbody></table></div>';
        szHtml += '<div class="modal-footer justify-content-center">  ';
        szHtml += '<button type="button" class="btn btn-primary btn-sm active action-show-leaderboard-general" id="footer-btn-title-'+this.LEADERBOARD_GENERAL+'" >'+TEXT_GENERAL_LEADERBOARD+'</button>';
        szHtml += '<button type="button" class="btn btn-primary btn-sm action-show-leaderboard-month" id="footer-btn-title-'+this.LEADERBOARD_MONTH + '" >'+TEXT_MONTHLY_LEADERBOARD+'</button>';
        szHtml += '<button type="button" class="btn btn-primary btn-sm action-show-leaderboard-day" id="footer-btn-title-'+this.LEADERBOARD_DAY + '">'+TEXT_DAILY_LEADERBOARD+'</button>';
        szHtml += '</div></div></div></div></div>';

        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  
        
        if(bAnimate){
            var leaderboardModal = new bootstrap.Modal(document.getElementById('leaderboardModal'));
            leaderboardModal.show();
        }
    };
    
    _refreshLeaderboardTopPlayer(iTypeLeaderboard){
        var szHtml = "";

        for(var k=0;k<3;k++){
            if(this._aLeaderboard[iTypeLeaderboard][k].userId === s_oNetworkManager.getPlayerNickname()){
                szHtml += '<tr class="top-players-bg-color table-active">';
                this._aPlayerPos[iTypeLeaderboard]["leaderboard_index"] = k;
            }else{
                szHtml += '<tr class="top-players-bg-color">';
            }

            szHtml += this._buildRow(this._aLeaderboard[iTypeLeaderboard][k]);
        }
        
        if(document.querySelector(".top-players-container")){
            document.querySelector(".top-players-container").innerHTML = "";
            document.querySelector(".top-players-container").appendChild(htmlMarkupToNode(szHtml));
        }
        
        return szHtml;
    };
    
    _refreshLeaderboardLastPlayer(iTypeLeaderboard){
        var szHtml = "";
        var iCont = this._aLeaderboard[iTypeLeaderboard][3].rank;
        for(var k=3;k<this._aLeaderboard[iTypeLeaderboard].length;k++){
            if(this._aLeaderboard[iTypeLeaderboard][k].userId === s_oNetworkManager.getPlayerNickname()){
                szHtml += '<tr class="table-active">';
                this._aPlayerPos[iTypeLeaderboard]["leaderboard_index"] = k;
            }else{
                szHtml += '<tr class="">';
            }

            szHtml += this._buildRow(this._aLeaderboard[iTypeLeaderboard][k]);
            
            
            iCont++;
        }
        
        if(document.querySelector(".last-players-container")){
            document.querySelector(".last-players-container").innerHTML = "";
            document.querySelector(".last-players-container").appendChild(htmlMarkupToNode(szHtml));
        }
        
        return szHtml;
    };

    _buildRow(oEntry){
        var szHtml = "";

        var szRank = oEntry.rank;
        if(oEntry.userId === "-"){
            szRank = "-";
        }
        
        szHtml += '<th class="text-end leaderboard-level" scope="row">'+szRank+'</th>';
        szHtml += '<td class="text-center leaderboard-badge badge-bg-top-player">'
        szHtml += '<div class="badges-container">';
        szHtml += '<div class="badges badge_'+oEntry.badge_index+'"></div></td>';
        szHtml += '</div>';
        //szHtml += '<td class="leaderboard-nickname"><img class="leaderboard-avatar" src="sprites/avatar/avatar1.png" alt="">'+this._aLeaderboard[iTypeLeaderboard][k].userId+'</td>';
        szHtml += '<td class="leaderboard-nickname">'+oEntry.userId+'</td>';
        szHtml += '<td class="text-end leaderboard-point point-bg-top-player">'+oEntry.score+'</td></tr>';
        
        return szHtml;
    }

    async getLeaderboardTopRankings(szLeaderboard,iStartIndex,iCount){
        var oPromise = new Promise((resolve,reject)=>{
            this._oCurClient.leaderboards.getTop(this.LEADERBOARD_GROUP_ID, szLeaderboard, iStartIndex, iCount, null,
                                function(entries) {resolve(entries);},
                                function(error) { reject(error);});
        });

        return await oPromise; 
    };

    async getLeaderboardPlayerRanking(szLeaderboard,szNickname){
        var oPromise = new Promise((resolve,reject)=>{
            this._oCurClient.leaderboards.getTop(this.LEADERBOARD_GROUP_ID, szLeaderboard, 0, 1, [ "simple"+szNickname ],
                                function(entries) {
                                    resolve(entries);
                                },
                                function(error) { 
                                    reject(error);
                                });
        });

        return await oPromise; 
    };

    async getLeaderboardNeighbourRanking(szLeaderboard,iStartIndex,iCount){
        var oPromise = new Promise((resolve,reject)=>{
       
            this._oCurClient.leaderboards.getNeighbourhood(this.LEADERBOARD_GROUP_ID, szLeaderboard, iStartIndex, iCount, null,
                                            function(entries) {resolve(entries);},
                                            function(error) { reject(error);});

        });

        return await oPromise; 
    };

    clearLeaderboards(){
        var oNode = document.querySelector("#leaderboardModal");
        oNode.innerHTML = '';
    };
    
    resetLeaderboard(iTypeLeaderboard){
        //CHECK IF PLAYER IN LEADERBOARD ARE ENOUGH
        if(this._aLeaderboard[iTypeLeaderboard].length<this.NUM_LEADERBOARD_ROWS){
            for(var k=this._aLeaderboard[iTypeLeaderboard].length;k<this.NUM_LEADERBOARD_ROWS;k++){
                this._aLeaderboard[iTypeLeaderboard][k] = {userId: "-", rank: k, score: "0"};
            }
        }
    };
    
    refreshLeadeboard(iTypeLeaderboard){
        if(document.getElementById("leaderboardModal")){
            this._refreshLeaderboardTopPlayer(iTypeLeaderboard);
            this._refreshLeaderboardLastPlayer(iTypeLeaderboard);
        }else{
            this.__createLeaderboardDialog(iTypeLeaderboard,true);
        }
        
        this.deselectButtons();
        this._iCurLeaderboardToShow = iTypeLeaderboard;
        document.querySelector("#footer-btn-title-"+iTypeLeaderboard).classList.add('active');
        this._oGUIController.__removeLoadingModal();
    };
    
    onSelectLeaderboardGeneral(){
        this._oGUIController.__createLoadingModal();

        //GET PLAYER GENERAL POSITION
        var iBoardID = this.LEADERBOARD_GENERAL;
        this._showLeaderboard(iBoardID);
    };

    onSelectLeaderboardMonthly(){
        this._oGUIController.__createLoadingModal();

        //GET PLAYER MONTH POSITION
        var iBoardID = this.LEADERBOARD_MONTH;
        this._showLeaderboard(iBoardID);

    };

    onSelectLeaderboardDaily(){
        this._oGUIController.__createLoadingModal();

        //GET PLAYER DAILY POSITION
        var iBoardID = this.LEADERBOARD_DAY;
        this._showLeaderboard(iBoardID);
    };

    
    _showLeaderboard(iBoardID){
        this.resetLeaderboard(iBoardID);
        
        var szDate = this._getTimeInterval(iBoardID);
        
        var oPlayerEntry = this._aPlayerPos[iBoardID];

        if( oPlayerEntry === undefined || oPlayerEntry.score !== this._aLeaderboard[iBoardID][oPlayerEntry.leaderboard_index].score){
            this.getLeaderboardPlayerRanking(szDate,s_oNetworkManager.getPlayerNickname()).then(
                    (oRet)=>{ 
                        if(oRet.length>0){
                            this._aPlayerPos[iBoardID] = this.parseLeaderboardEntry(oRet[0]);
                    
                            this._buildLeaderboard(iBoardID).then(()=>{ 
                                this.refreshLeadeboard(iBoardID);
                            });

                        }else{
                            this.refreshLeadeboard(iBoardID);
                        }
                    }
            ); 
        }else{
            this.refreshLeadeboard(iBoardID);
        }
    }
    

    deselectButtons(){
        document.querySelector("#footer-btn-title-"+this.LEADERBOARD_DAY).classList.remove('active');
        document.querySelector("#footer-btn-title-"+this.LEADERBOARD_GENERAL).classList.remove('active');
        document.querySelector("#footer-btn-title-"+this.LEADERBOARD_MONTH).classList.remove('active');
    };

    parseLeaderboardEntry(oEntry){
        var iScore = 0;
        if(oEntry.score){
            iScore = oEntry.score;
        }

        //CALCULATE BADGE TYPE
        var iLevel = this.calculateBadgeLevelByRanking(iScore);

        var szUserID = oEntry.userId;
        if (String(oEntry.userId).includes("simple")) {
            szUserID = oEntry.userId.split("simple")[1];
        }

        return {userId: szUserID, rank: oEntry.rank, score: iScore,badge_index:iLevel};
    };
    
    calculateBadgeLevelByRanking(iRanking) {
        //console.log("iRanking "+iRanking)
        var iBadgeIndex = 0;
        for (var i = 0; i < this.BADGE_OFFSET.length; i++) {
                //console.log("this.BADGE_OFFSET["+i+"] "+this.BADGE_OFFSET[i])
                if (iRanking >= this.BADGE_OFFSET[i]) {
                    iBadgeIndex++;
                    //console.log("iBadgeIndex "+iBadgeIndex)
                } else {
                    if(iBadgeIndex === 0){
                        return 0;
                    }
                  
                    return iBadgeIndex -1;
                }
            
        }

        return iBadgeIndex-1;
    };
    
    getBadgePointsByIndex(iLevel){
        var iCont = 0;
        for (var i = 0; i < this.BADGE_OFFSET.length; i++) {
                if(iLevel === iCont){
                    return this.BADGE_OFFSET[i];
                }
                iCont++;
            
        }
        
        return this.BADGE_OFFSET[0];
    };
    
    getWinPointByRank(iBadgeLevel) {
        return this.WIN_POINTS[iBadgeLevel];
    };
    
    getNumBadges(){
        return this._iAmountBadges;
    };
    
    setCurClient(oClient){
        this._oCurClient = oClient;
    };
    
}

