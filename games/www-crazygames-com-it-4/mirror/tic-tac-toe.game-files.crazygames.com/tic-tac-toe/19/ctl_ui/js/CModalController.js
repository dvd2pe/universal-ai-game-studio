class CModalController{
    
    constructor(oController){
        this._oGUIController = oController;
        
        this._aTaggedGames = [];
        this._aOtherGames = [];
        this._aFeaturedGames = [];
        
        if (SHOW_MOREGAMES) {
            if (typeof FEATURED_GAMES !== 'undefined' && typeof TAGGED_GAMES !== 'undefined' && typeof OTHER_GAMES !== 'undefined') {
                this._loadMoregamesInfos();
            }
        }
        
    };
    
    createLoginPanel(){    
        var szHtml = '<div class="modal fade overflow-hidden" id="loginModal" aria-labelledby="loginModalLabel" aria-hidden="true">';
        szHtml += '<div class="modal-dialog modal-dialog-centered">';
        szHtml += '<div class="modal-content"><div class="modal-header">';
        //szHtml += '<div class="modal-content animate__animated animate__fadeInUpBig"><div class="modal-header">';
        szHtml += '<h1 class="modal-title fs-5" id="loginModalLabel">'+TEXT_LOGIN+'</h1>';
        szHtml += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="'+TEXT_CLOSE+'"></button></div>';
        szHtml += '<div class="modal-body">';
        szHtml += '<form>';
        szHtml += '<div class="mb-3">';
        szHtml += '<label for="modal-login-email" class="form-label">'+TEXT_SYS_CHOOSENICK_OR_EMAIL+'<i class="mandatory ms-1 fa-solid fa-asterisk"></i></label>';
        szHtml += '<input class="form-control" id="modal-login-email" aria-describedby="emailHelp"></div>';
        szHtml += '<div class="mb-3">';
        szHtml += '<label for="modal-login-pwd" class="form-label">'+TEXT_PWD+'<i class="mandatory ms-1 fa-solid fa-asterisk"></i></label>';
        szHtml += '<input type="password" class="form-control" id="modal-login-pwd" /></div>';
        szHtml += "<a class='underlined-text-but action-restore-pwd'>"+TEXT_PWD_FORGOT+"  </a>";
        szHtml += '<p id="restore-pwd-alert-text" class="ctl-multiplayer-alert-text"></p>';
        szHtml += '<p id="login-alert-text" class="ctl-multiplayer-alert-text"></p>';        
        szHtml += '<div class="btn btn-primary action-try-login">'+TEXT_SUBMIT+'</div>';
        szHtml += '</form></div></div></div></div>';
        
        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  
   
        
        var oModal = new bootstrap.Modal(document.getElementById('loginModal'));
        oModal.show();
    };
    
    createRegisterPanel(){
        var szHtml = '<div class="modal fade overflow-hidden" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">';
        szHtml += '<div class="modal-dialog modal-dialog-centered" id="registerModalContainer"><div class="modal-content animate__animated animate__fadeInUpBig"><div class="modal-header">';
        szHtml += '<h1 class="modal-title fs-5" id="registerModalLabel">'+TEXT_REGISTER+'</h1>';
        szHtml += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="'+TEXT_CLOSE+'"></button></div>';
        szHtml += '<div class="modal-body">';
        szHtml += '<form>';
        szHtml += '<div class="mb-3">';
        szHtml += '<label for="modal-register-nick" class="form-label">'+TEXT_SYS_CHOOSENICK+'<i class="mandatory ms-1 fa-solid fa-asterisk"></i></label>';
        szHtml += '<input class="form-control" id="modal-register-nickname"></div>';
        szHtml += '<div class="mb-3">';
        szHtml += '<label for="modal-register-email" class="form-label">'+TEXT_EMAIL+'<i class="mandatory ms-1 fa-solid fa-asterisk"></i></label>';
        szHtml += '<input class="form-control" id="modal-register-email"></div>';
        szHtml += '<div class="mb-3">';
        szHtml += '<label for="modal-register-pwd" class="form-label">'+TEXT_PWD+'<i class="mandatory ms-1 fa-solid fa-asterisk"></i></label>';
        szHtml += '<input type="password" class="form-control" id="modal-register-pwd"></div>';
        szHtml += '<div class="mb-3">';
        szHtml += '<label for="modal-register-confirm-pwd" class="form-label">'+TEXT_SYS_CONFIRM_PWD+'<i class="mandatory ms-1 fa-solid fa-asterisk"></i></label>';
        szHtml += '<input type="password" class="form-control" id="modal-register-confirm-pwd"></div>';
        if(TEXT_PRIVACY_URL !== ""){
            szHtml += '<div class="mb-3">';
            szHtml += '<a class="terms-privacy-text-color" href="'+TEXT_PRIVACY_URL+'" target="_blank">'+TEXT_PRIVACY+'</a>';
            szHtml += '</div>';
        }
        if(TEXT_TERMS_OF_USE_URL !== ""){
            szHtml += '<div class="mb-3">';
            szHtml += '<a class="terms-privacy-text-color" href="'+TEXT_TERMS_OF_USE_URL+'" target="_blank">'+TEXT_TERMS_OF_USE+'</a>'
            szHtml += '</div>';
        }
        szHtml += '<p id="register-alert-text" class="ctl-multiplayer-alert-text"></p>';
        szHtml += '<button type="button" class="btn btn-primary action-try-register">'+TEXT_REGISTER+'</button>';
        szHtml += '</form></div></div></div></div>';
        
        document.querySelector(".sidebar-menu-container").innerHTML += szHtml;
        
        var oModal = new bootstrap.Modal(document.getElementById('registerModal'));
        oModal.show();
    };
    
    createLangPanel(){
        var szHtml = '';
        szHtml += '<div class="modal fade" id="languageModal" tabindex="-1" aria-labelledby="languageModalLabel" aria-hidden="true">';
        szHtml += '<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">';
        szHtml += '<div class="modal-content">';
        szHtml += '<div class="modal-header">';
        szHtml += '<h1 class="modal-title fs-5" id="languageModalLabel">' + TEXT_LANGUAGE + '</h1>';
        szHtml += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="' + TEXT_CLOSE + '"></button></div>';
        szHtml += '<div class="modal-body">';
        szHtml += '<ul class="list-group list-group-flush">';
        
        for (let szLang in TEXT_ORIGINAL_LANGUAGE) {
            szHtml += '<li class="list-group-item text-dark action-select-lang" data-flag='+szLang+'>'
                szHtml += '<span class="language-flag bg-'+szLang+'"></span>'
            szHtml += TEXT_ORIGINAL_LANGUAGE[szLang]+'</li>';
        }
        
        szHtml += '</ul></div></div></div></div>';    
       
        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  

        var oModal = new bootstrap.Modal(document.getElementById('languageModal'));
        oModal.show();
    };
    
    createCreditsPanel(){
        var szUrlText = TEXT_CREDITS_URL.split("//")[1];
        
        var szHtml = '<div class="modal fade credits-box overflow-hidden" id="creditsModal" tabindex="-1" aria-labelledby="creditsModalLabel" aria-hidden="true">';
            szHtml += '<div class="modal-dialog modal-dialog-centered">';
                szHtml += ' <div class="modal-content animate__animated animate__fadeInUpBig">';
                    szHtml += '<div class="modal-header">';
                        szHtml += '<h1 class="modal-title fs-5 text-center" id="creditsModalLabel"><i class="fa-solid fa-circle-info icon-start"></i>'+TEXT_CREDITS+'</h1>';
                        szHtml += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
                    szHtml += '</div>';
                    
                    if(ALLOW_OUTGOING_LINKS){
                        szHtml += '<a href="'+TEXT_CREDITS_URL+'" target="_blank">';
                    }
                            szHtml += '<div class="modal-body"> ';
                                var szVersion = "v "+ (s_szCurVers || "1.00");
                                szHtml += '<h1 class="modal-title fs-5 text-left" id="version">'+szVersion+'</h1>';
                                szHtml += '<div class="text-center">';
                                    szHtml += ' <img class="ctl-logo" src="ctl_ui/sprites/codethislab-logo-white.svg" alt="Code This Lab">';
                                    //szHtml += '<h3>'+szUrlText+'</h3>';
                                    szHtml += ' <br>';
                                    szHtml += ' <br>';
                                    szHtml += ' <br>';
                                    szHtml += ' <img class="cg-logo" src="sprites/cg_logo.png" alt="cg logo">';
                                    
                                szHtml += '</div> ';
                            szHtml += '</div> ';
                    if(ALLOW_OUTGOING_LINKS){
                        szHtml += '</a>'; 
                    }    
                szHtml += ' </div>'; 
            szHtml += ' </div>'; 
        szHtml += ' </div>'; 
            
        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  
        
        var oModal = new bootstrap.Modal(document.getElementById('creditsModal'));
        oModal.show();
    };
    
    createContactModal(szTitle, szDescription, szServicePath){
        var szServiceText = TEXT_CTL_SERVICE_LINK + szServicePath + "/";
        var szLink = szServiceText +"?game="+GAME_CTL_ID + "&platform=" + PLATFORM_CTL_ID;
        
        
        var szHtml = '<div class="modal fade general-box overflow-hidden" id="sendEmailModal" tabindex="-1" aria-labelledby="sendEmailModalLabel" aria-hidden="true">';
            szHtml += '<div class="modal-dialog modal-dialog-centered">';
                szHtml += ' <div class="modal-content animate__animated animate__fadeInUpBig">';
                    szHtml += '<div class="modal-header">';
                        szHtml += '<h1 class="modal-title fs-5 text-center" id="sendEmailModalLabel"><i class="fa-solid fa-circle-info icon-start"></i>'+szTitle+'</h1>';
                        szHtml += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
                    szHtml += '</div>';

                        szHtml += '<div class="modal-body"> ';
                            szHtml += '<div class="text-center">';
                                szHtml += '<h3>'+szDescription+'</h3>';

                                if(ALLOW_OUTGOING_LINKS){
                                    szHtml += '<h2><a href="'+szLink+'" target="_blank" style="text-decoration: underline;">'+szServiceText+'<a></h2>';
                                }else{
                                    szHtml += '<h2>'+szServiceText+'</h2>';
                                }
                            szHtml += '</div> ';
                        szHtml += '</div> ';
                    szHtml += '</a>'; 
                szHtml += ' </div>'; 
            szHtml += ' </div>'; 
        szHtml += ' </div>'; 
            
        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  
        
        
        if(document.querySelector("#statsModal")){
            document.querySelector(".modal-backdrop").classList.add('d-none');
            document.querySelector("#statsModal").remove();
        }
        
        var oModal = new bootstrap.Modal(document.getElementById('sendEmailModal'));
        oModal.show();
    };
    
    createStatsPanel(){
        var iWins = this._oGUIController.getWinMatches();
        var iLosses = this._oGUIController.getLossMatches();
        var iTotalMatches = this._oGUIController.getTotMatches();
        var iPlayerRanking = this._oGUIController.getRanking();
        var iCurBadgeLevel  = this._oGUIController.getBadgeLevel();
        var iPerc = 0;
        
        if(iTotalMatches>0){
            iPerc = parseFloat((iWins/iTotalMatches).toFixed(2))*100;
        }

        var szHtml = '<div class="modal fade general-box overflow-hidden" id="statsModal" tabindex="-1" aria-labelledby="statsLabel" aria-hidden="true">';
            szHtml += '<div class="modal-dialog modal-dialog-centered">';
                szHtml += ' <div class="modal-content animate__animated animate__fadeInUpBig">';
                    szHtml += '<div class="modal-header">';
                        szHtml += '<h1 class="modal-title fs-5 text-center d-flex align-items-center" id="statsLabel"><td class="text-center stats-badge">';
                            szHtml += '<div class="badges-container"><div class="badges badge_'+iCurBadgeLevel+'"></div></div>';
                            szHtml += '<div class="ml-2">' + s_oNetworkManager.filterString(s_oNetworkManager.getPlayerNickname())+'</div>'+'</h1>';
                        szHtml += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
                    szHtml += '</div>';
                    szHtml += '<a>';
                        szHtml += '<div class="modal-body"> ';
                            szHtml += '<div class="text-center">';
                                szHtml += '<h3>'+TEXT_WINS+": "+iWins+'</h3>';
                                szHtml += '<h3>'+TEXT_LOSSES+": "+iLosses+'</h3>';
                                szHtml += '<h3>'+TEXT_WIN_PERC+": "+iPerc+'%</h3>';
                                 szHtml += '<br>'
                                szHtml += '<h2>'+TEXT_RANKING+": "+iPlayerRanking+'</h3>';
                                szHtml += '<button class="btn btn-danger rounded-pill action-delete-user mt-5" type="button">'+TEXT_DELETE_ACCOUNT+'</button>';
                            szHtml += '</div> ';
                        szHtml += '</div> ';
                    szHtml += '</a>'; 
                szHtml += ' </div>'; 
            szHtml += ' </div>'; 
        szHtml += ' </div>'; 
            
        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  
        
        var oModal = new bootstrap.Modal(document.getElementById('statsModal'));
        oModal.show();
    };

    createMoreGamesPanel(){
        var szHtml = '<div class="modal fade more-games-box overflow-hidden" id="moregamesModal" tabindex="-1" aria-labelledby="moregamesModalLabel" aria-hidden="true">';
            szHtml += '<div class="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-lg-down">';
                szHtml += '<div class="modal-content animate__animated animate__fadeInUpBig">';
                    szHtml += ' <div class="modal-header">';
                        szHtml += '<img class="ctl-logo m-auto" src="ctl_ui/sprites/codethislab-logo-white.svg" alt="Code This Lab">';
                        szHtml += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
                    szHtml += '</div>';
                    szHtml += '<div class="modal-body">';
                        szHtml += '<div class="col col-12"><h4>'+TEXT_FEATURED_GAMES+'</h4></div>';
                        szHtml += '<div class="owl-carousel owl-main owl-theme mb-4">';
                            for(var k=0;k<this._aFeaturedGames.length;k++){
                                szHtml += '<a class="img-game" href="'+this._aFeaturedGames[k].url+'" target="_blank"><img src="'+this._aFeaturedGames[k].img+'" alt=""></a>';
                            }
                        szHtml += '</div>';
                        szHtml += '<div class="mb-3">';
                            szHtml += '<div class="col col-12"><h4>'+TEXT_OTHER_GAMES+'</h4></div>';
                            szHtml += '<div class="owl-carousel owl-theme mb-3">';
                                for(var k=0;k<this._aTaggedGames.length;k++){
                                    szHtml += '<a class="img-game" href="'+this._aTaggedGames[k].url+'" target="_blank"><img src="'+this._aTaggedGames[k].img+'" alt=""></a>';
                                }
                            szHtml += '</div>';
                            szHtml += '<div class="owl-carousel owl-theme">';
                                for(var i=0;i<this._aOtherGames.length;i++){
                                    szHtml += '<a class="img-game" href="'+this._aOtherGames[i].url+'" target="_blank"><img src="'+this._aOtherGames[i].img+'" alt=""></a>';
                                }
                            szHtml += '</div>';
                        szHtml += '</div>';
                    szHtml += '</div>';
                szHtml += '</div>';
            szHtml += '</div>';
        szHtml += '</div>';
        
        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  
        
                            $('.owl-main').owlCarousel({
                stagePadding: 30,
                loop:true,
                margin:10,
                nav:true,
                dots:false,
                items:3,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:2
                    },
                    1000:{
                        items:3
                    }
                }
            })
            
            $('.owl-carousel').owlCarousel({
                stagePadding: 20,
                loop:true,
                margin:10,
                nav:true,
                dots:false,
                responsive:{
                    0:{
                        items:2
                    },
                    600:{
                        items:4
                    },
                    1000:{
                        items:5
                    }
                }
            })
        
        var oModal = new bootstrap.Modal(document.getElementById('moregamesModal'));
        oModal.show();
        

    };

    

    createAlertPanel(szText){
        var szHtml = '<div class="modal fade overflow-hidden" id="alertModal" tabindex="-1"  aria-hidden="true">';
        szHtml += '<div class="modal-dialog modal-dialog-centered"><div class="modal-content animate__animated animate__fadeInUpBig"><div class="modal-header">';
        szHtml += '<h1 class="modal-title fs-5" id="alertModalLabel">'+szText+'</h1>';
        szHtml += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="'+TEXT_CLOSE+'"></button></div>';
        szHtml += '<div class="modal-body">';
        szHtml += '</div></div></div>';

        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  
        
        var oModal = new bootstrap.Modal(document.getElementById('alertModal'));
        oModal.show();
    };
    
    createConfirmPanel(szID, szText, szAction){
        var szHtml = '<div class="modal fade overflow-hidden" id="confirmModal" tabindex="-1"  aria-hidden="true">';
        szHtml += '<div class="modal-dialog modal-dialog-centered"><div class="modal-content animate__animated animate__fadeInUpBig"><div class="modal-header">';
        szHtml += '<h1 class="modal-title fs-5" id="alertModalLabel">'+szText+'</h1></div>';
        szHtml += '<div class="modal-body">';
        szHtml += '<button type="button" class="btn btn-primary btn-sm action-not-confirm-in-modal" data-bs-dismiss="modal"  id="footer-btn-title-'+TEXT_NO+'" >'+TEXT_NO+'</button>';
        szHtml += '<button type="button" class="btn btn-primary btn-sm '+szAction+' float-end" data-bs-dismiss="modal" id="'+szID+'" >'+TEXT_YES+'</button>';
        szHtml += '</div></div></div>';

        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  
        
        var oModal = new bootstrap.Modal(document.getElementById('confirmModal'));
        oModal.show();
    };
    
    createLoadingPanel(){
        var szHtml = '';
        szHtml += '<div class="block-loading-container show d-flex justify-content-center align-items-center">';
            szHtml += '<div class="block-loading"></div>';
                szHtml += '<div class="block-loading-spinner">';
                    szHtml += '<div class="spinner-border text-light"></div>';
                szHtml += '</div>';
        szHtml += '</div>';
 
        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  
    };
    
    removeLoadingPanel(){
        if(document.querySelector(".block-loading-container")){
            document.querySelector(".block-loading-container").remove();
        }
    };
    
    /*
this._loadMoregamesInfos = function(){

            if( GAME_LIST_JSON.length === 0 ){
                  return;
            }

            //ADD JUST GAMES WITH SELECTED TAG
            this._aFeaturedGames = [];
            for(var t=0;t<GAME_TAGS.length;t++){
                for(var k=0;k<GAME_LIST_JSON.length;k++){
                    if(GAME_LIST_JSON[k].tag.indexOf(GAME_TAGS[t]) !== -1 && this._aFeaturedGames.indexOf(GAME_LIST_JSON[k]) === -1 && GAME_LIST_JSON[k].id !== _szGameId){
                        this._aFeaturedGames.push(GAME_LIST_JSON[k]);
                    }
                }
            }

            this._aOtherGames = new Array();
            for(var k=0;k<GAME_LIST_JSON.length;k++){
                if(this._aFeaturedGames.indexOf(GAME_LIST_JSON[k]) === -1 && GAME_LIST_JSON[k].id !== _szGameId){
                    this._aOtherGames.push(GAME_LIST_JSON[k]);
                }
            }

    };*/
    _loadMoregamesInfos(){
        this._aFeaturedGames = [];
        for(var k=0;k<FEATURED_GAMES.length;k++){
            this._aFeaturedGames.push(FEATURED_GAMES[k]);
        }
        
        this._aTaggedGames = new Array();
        for(var k=0;k<TAGGED_GAMES.length;k++){
            this._aTaggedGames.push(TAGGED_GAMES[k]);
        }
        
        this._aOtherGames = new Array();
        for(var k=0;k<OTHER_GAMES.length;k++){
            this._aOtherGames.push(OTHER_GAMES[k]);
        }
    }   
    
}

