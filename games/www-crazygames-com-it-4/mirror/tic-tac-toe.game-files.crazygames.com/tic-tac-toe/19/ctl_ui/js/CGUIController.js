// CGUIController - v1.0.5

/* 
v1.0.5------
    - minor bug fix

v1.0.4------
    - added function to create easily toggle and button in the bar
        - now you can click on the toggle in the whole field
        - fixed fullscreen toggle with change event
    - added the "NOTIFY" functionality 
        - you can set a red DOT nearly a button or toggle to show a NEW content
        - you can set the red DOT, to show a change of state (eg. ask for victory in backgammon)
    - hamburger button and X button are now separated button
    - new CModalController, to separate modal functionality

v1.0.3------
    - added functions to hide music / sfx toggle
        -hideSFXToggle, hideMusicToggle
    - Various bug fixed   

v1.0.2------
    - new ALLOW_OUTGOING_LINKS variable, to control clicks on links

v1.0.1------
    - Removed Touchpress if you scroll the view
    - Separated Leaderboard Controller
    - Various bug fixed   
*/

var MULTIPLAYER_GAME;
var LOGIN_SECTION;
var MULTILANGUAGE_SECTION;
var SHOW_MOREGAMES;
var ALLOW_OUTGOING_LINKS;
        
class CGUIController{

    static ON_SELECT_LANG = "on_select_lang";
    static ON_GOTO_MAIN_MENU = "on_goto_main_menu";
    static ON_RESTART_GAME = "on_restart_game";
    static ON_BACK_BUTTON = "on_back_button";

    constructor(bMultiplayer = true, bLogin = false, bLang = true, bMoreGames = false, bAllowOutgoing = false){
        MULTIPLAYER_GAME = bMultiplayer;
        LOGIN_SECTION = bLogin;
        MULTILANGUAGE_SECTION = bLang;
        SHOW_MOREGAMES = bMoreGames;
        ALLOW_OUTGOING_LINKS = bAllowOutgoing;
        
        this._oEventListener = new CEventsHandler();
        
        this._szActionCustomButtons = "action-custom-buttons";
        this._szActionConfirmModals = 'action-confirm-modals';
        
        this._szIdConfirmGotoMenu = "confirm-gotomenu";
        this._szIdConfirmRestart = "confirm-restart";
        
        this.REMOVE_ADS_SUBSCRIPTION = "remove_ads_subscription";
        this.REMOVE_ADS_DURABLE = "remove_ads_durable";
        this.REMOVE_ADS_NULL = ""; 

        this._szRemoveAdsType = this.REMOVE_ADS_NULL;

        this._bShowPrivacyBut = false;


        this.GAME_OPTIONS_DIV_ID = "game_options";

        this.DYNAMIC_LOADING; //CHECK THIS TRUE IF THERE IS ANY DYNAMIC RESOURCE LOADING

        this._fRequestFullScreen = null;
        this._fCancelFullScreen = null;

        this._bJoiningRoom;

        this._szRoomID;
        this._szPass;

        
        this._iWins;
        this._iLosses;
        this._iTotMatches;
        this._iPlayerRanking;
        this._iCurBadgeLevel;
        this._oInfoAccessRoom = null;
        this._oCurClient;
        /////
        
        this._oModalController = new CModalController(this);
        
        if(LOGIN_SECTION){
            this._oLeaderboardController = new CLeaderboardController(this);
        }
        this.resetPlayerValues();
        
        var doc = window.document;
        var docEl = doc.documentElement;
        this._fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        this._fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(MULTILANGUAGE_SECTION){
            refreshLanguageGUIController();
        }

        
        //CREATE MENU DIV
        var div = document.createElement('div');
        div.className = 'sidebar-menu-container';
        document.body.appendChild(div);
        
        
        this.createSideBar();
        
        this.__modalCallbacks();
        this.__modalsCallbacks();

        this.hideBackButton();

        if(LOGIN_SECTION){
            s_oNetworkManager.addEventListener(ON_USER_LOGOUT,this.onUserLogout,this);
            s_oNetworkManager.addEventListener(ON_USER_LOGGED,this.onUserLogged,this);
        }
        if(MULTIPLAYER_GAME){
            s_oNetworkManager.addEventListener(ON_USEROWNERROOM_JOIN_SUCCESS, ()=>{
                if(document.querySelector(".block-loading-container")){
                    this._oModalController.removeLoadingPanel();
                }
            }, this);
        }
    };
    
    createSideBar(){
        //CREATE SIDEBAR
        var szHtml = '';        
        
        szHtml += '<div id="offcanvas-block" class="offcanvas-block action-toggle-sidebar"></div>';
        
        szHtml += '<a id="back-btn" class="btn btn-link go-back-btn action-go-back" role="button" aria-controls="goBack"><i class="fa-solid fa-arrow-left"></i></a> '; 
        

        szHtml += '<a id="cart-btn" class="cart-btn action-remove-ads" href="#" role="button"><i class="fa-solid fa-cart-shopping"></i></a>';
        
        
        szHtml += '<div class="offcanvas offcanvas-end sidebar-menu" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">';
        szHtml += '<div id="offcanvas-header" class="offcanvas-header p-2" >';
        
        if(LOGIN_SECTION){
            //LOGIN SECTION
            szHtml += '<div class="btn-group logged-user d-none" id="sidebar-section-login">'; 
            szHtml += '<button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">';
            szHtml += '<img class="leaderboard-avatar" src="" alt="">';
            szHtml += "<span></span></button>"
            szHtml += '<ul class="dropdown-menu">';
            szHtml += '<li><a class="dropdown-item action-show-profile">'+TEXT_MY_PROFILE+'</a></li>';
            szHtml += '<li><hr class="dropdown-divider"></li>';
            szHtml += '<li><a class="dropdown-item action-logout">'+TEXT_LOGOUT+'</a></li>';
            szHtml += '</ul></div>';

            szHtml += '<button id="button_login" type="button" class="btn btn-primary action-show-login">'+TEXT_LOGIN+'</button>';
            szHtml += '<button id="button_register" type="button" class="btn btn-primary action-show-register">'+TEXT_REGISTER+'</button>';
        }
        
        szHtml += '</div>';
        
        szHtml += '<div id="offcanvas-body" class="offcanvas-body">';
        szHtml += '<div class="list-group sidebar-menu-form-check sidebar-menu-button-link">';
        szHtml += '<h4 class="sidebar-menu-section-title" id="sidebar-menu-section-title-0">'+TEXT_SETTINGS+'</h4>';

        if(MULTILANGUAGE_SECTION){
            var iLangCode = LANG_CODES[s_iStartingLangCode];
            if(iLangCode === undefined){
                iLangCode = LANG_EN;
                s_iStartingLangCode = "en";
            }
            szHtml += '<div id="but-lang" class="cursor-pointer form-check action-show-lang"><div class="row align-items-center">';
            szHtml += '<div class="col col-8" id="sidebar-menu-section-0-0"><i class="fa-solid fa-language icon-start"></i><span>'+TEXT_LANGUAGE+'</span></div>';
            szHtml += '<div class="col col-4"><div id="flag-cur-language" class="language-flag bg-'+s_iStartingLangCode+' " ></div></div></div></div>';
        }

        if(ENABLE_FULLSCREEN){
            szHtml += this._makeToggle("fullscreen-toggle", TEXT_FULLSCREEN_ON, TEXT_FULLSCREEN_OFF, "fa-solid fa-expand", s_bFullscreen, "action-toggle-fullscreen");
            
            screenfull.on('change', ()=>{
                    s_bFullscreen = screenfull.isFullscreen;
                    this._setToggleValue("fullscreen-toggle", s_bFullscreen);
            });
        }
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            szHtml += this._makeToggle("music-toggle", TEXT_MUSIC_ON, TEXT_MUSIC_OFF, "fa-solid fa-music", s_bMusicActive, "action-toggle-music");
            szHtml += this._makeToggle("sfx-toggle", TEXT_SFX_ON, TEXT_SFX_OFF, "fa-solid fa-volume-high", s_bSfxActive, "action-toggle-sfx");
        }
        
        

        var szID = "privacy-but";
        var szText = TEXT_PERSONAL_DATA_MANAGEMENT;
        var szIcon = "fa-solid fa-shield-halved";
        szHtml += this._makeButton(szID, szText, szIcon, "action-on-privacy");   
 
            
        szHtml += '</div>';

        ////////////GAME OPTIONS

        szHtml += '<div class="sidebar-menu-button-link">';
        szHtml += '<h4 class="sidebar-menu-section-title" id="sidebar-menu-section-title-1">'+TEXT_GAME_OPTION+'</h4>'
        
        szHtml += '<div id="'+this.GAME_OPTIONS_DIV_ID+'" class="d-grid">';
        
        var szID = "main-menu-but";
        var szText = TEXT_MAIN_MENU;
        var szIcon = "fa-solid fa-house";
        szHtml += this._makeButton(szID, szText, szIcon, "action-goto-menu");   


        var szID = "restart-game-but";
        var szText = TEXT_SB_RESTART;
        var szIcon = "fa-solid fa-arrows-rotate";
        szHtml += this._makeButton(szID, szText, szIcon, "action-restart-game"); 
        
        
        if(LOGIN_SECTION){
            var szID = "leaderboard-but";
            var szText = TEXT_LEADERBOARD;
            var szIcon = "fa-solid fa-ranking-star";
            szHtml += this._makeButton(szID, szText, szIcon, "action-show-leaderboard");   
        }
        
        /*
	    var szID = "report-bugs-but";	
        var szText = TEXT_REPORT_BUG;
        var szIcon = "fa-solid fa-bug";
        szHtml += this._makeButton(szID, szText, szIcon, "action-report-bug");        
        */
        
        var szID = "remove-ads-side";	
        var szText = TEXT_REMOVE_ADS;
        var szIcon = "fa-solid fa-coins";
        szHtml += this._makeButton(szID, szText, szIcon, "action-remove-ads");

        if(isIOS()){
            var szID = "restore-side";	
            var szText = TEXT_SVC_RESTORE;
            var szIcon = "fa-solid fa-clock-rotate-left";
            szHtml += this._makeButton(szID, szText, szIcon, "action-restore-purchase-ios");
        }

        
        szHtml += '</div></div>';
        if(LOGIN_SECTION){
            szHtml += '<div class="sidebar-menu-button-link">';
            szHtml += '<h4 class="sidebar-menu-section-title" id="sidebar-menu-section-title-2">'+TEXT_MY_PROFILE+'</h4>';
            szHtml += '<div class="d-grid sidebar-menu-button-link">';
            
                var szID = "show-stats-but";	
                var szText = TEXT_STATS;
                var szIcon = "fa-solid fa-chart-line";
                szHtml += this._makeButton(szID, szText, szIcon, "action-show-stats"); 
                
            szHtml += '</div></div>';
        }
        
        if (SHOW_MOREGAMES) {
            //MOREGAMES
            szHtml += '<div class="more-games-btn d-grid gap-2">';
                szHtml += '<button class="btn btn-primary rounded-pill action-show-moregames" type="button">';
                    szHtml += '<i class="fa-solid fa-gamepad me-3"></i>';
                    szHtml += '<span>'+TEXT_MORE_GAMES+'</span>';
                szHtml += '</button>';
            szHtml += '</div>';
        }
        
        //CREDITS
        /*
        szHtml += '<div id="sidebar-footer" class="sidebar-footer">';
            szHtml += '<div class="row m-0 text-center">';
                //szHtml += '<div class="col col-6 align-self-center"><img class="ctl-logo action-goto-website" src="ctl_ui/sprites/codethislab-logo-white.svg" alt="Code This Lab">';
                //szHtml += '</div>';
                szHtml += '<div class="col col-6 align-self-center action-show-credits">';
                    szHtml += '<a href="#" class="text-decoration-none"><i class="fa-solid fa-circle-info icon-start"></i><span>'+TEXT_CREDITS+'</span></a>';
                szHtml += '</div>';
            szHtml += '</div>';
        szHtml += '</div>';
        */
        ///////////////////
        //szHtml += '</div>';    


        /////////HAMBURGER BUTTON
        szHtml += '<a class="btn btn-link action-toggle-sidebar toggle-sidebar-btn-top-right" role="button" aria-controls="sidebarMenu" id="toggle-sidebar-btn-top-right">';
            szHtml += '<span class="icon-wrapper">';
                szHtml += '<div class="hamburger hamburger--slider">';
                    szHtml += '<div class="hamburger-box">';
                        szHtml += '<div class="hamburger-inner hamburger-inner-white"></div>';
                    szHtml += '</div>';
                szHtml += '</div>';
                szHtml += '<span class="notification-dot notification-dot-hamburger d-none"></span>';
            szHtml += '</span>';
        szHtml += '</a>';

        /////////CLOSE BUTTON
        szHtml += '<a class="btn btn-link action-open-sidebar toggle-sidebar-btn-top-right d-none" role="button" aria-controls="sidebarMenu" id="close-sidebar-btn">';
            szHtml += '<span class="icon-wrapper">';
                szHtml += '<div class="hamburger hamburger--slider is-active close-button">';
                    szHtml += '<div class="hamburger-box">';
                        szHtml += '<div class="hamburger-inner hamburger-inner-white"></div>';
                    szHtml += '</div>';
                szHtml += '</div>';
            szHtml += '</span>';
        szHtml += '</a>';

        szHtml += '</div>';


        document.querySelector(".sidebar-menu-container").appendChild(htmlMarkupToNode(szHtml));   
        
        
        this.checkButtonStatus();
        
        this.refreshSidebarNotificationDot();
        
    };
    
    checkButtonStatus(){
        this.hidePrivacyButton();
        if(this._bShowPrivacyBut){
            this.showPrivacyButton();
        }
        
        this.hideCartButton();
        this.hideRemoveAdsButton();
        if(isIOS()){
            this.hideIOSRestoreButton();
        }
        if(this._szRemoveAdsType){
            this.showCartButton();
            this.showRemoveAdsButton();
            if(isIOS()){
                this.showIOSRestoreButton();
            }
        }
    };
    
    addEventListener(szEvent,cbCompleted, cbOwner,aParams = [], bOnce = false, bApply = false){
        aParams.unshift(this);
        this._oEventListener.addEventListener(szEvent,cbCompleted, cbOwner, aParams, bOnce, bApply);
    };
    
    removeEventListener(szEvent, oListenerObj = null){
        if(oListenerObj){
            this._oEventListener.removeEventListener(oListenerObj);
        }else{
            this._oEventListener.removeAllEventListeners(szEvent);
        }
    };
    
    refreshButtonPos(){
        //REMEMBER TO ADD s_oGUIController TO sizeHandler IN ctl_utils
        this._setSafeArea();
    };
    
    resetPlayerValues(){
        this._iWins = 0;
        this._iLosses = 0;
        this._iTotMatches = 0;
        this._iPlayerRanking = 0;
        this._iCurBadgeLevel = 0; 
    };
    
    onRefreshRanking(oData){
        this._iPlayerRanking = parseInt(oData.ranking);
        this._iWins = parseInt(oData.win_matches);
        this._iLosses = parseInt(oData.lose_matches);
        this._iTotMatches = this._iWins +this._iLosses;
        this._iCurBadgeLevel = this.calculateBadgeLevelByRanking(this._iPlayerRanking);
    };
    
    refreshPlayerInfos(){
        if(!s_oNetworkManager.isLogged()){
            return;
        }

        this._oCurClient.bigDB.loadMyPlayerObject((myDBObject)=>{
            if(myDBObject.ranking !== undefined){
                this._iPlayerRanking = parseInt(myDBObject.ranking);

                this._iWins = parseInt(myDBObject.wins);
                this._iLosses = parseInt(myDBObject.losses);
                this._iTotMatches = parseInt(myDBObject.tot_matches);
                this._iCurBadgeLevel = this.calculateBadgeLevelByRanking(this._iPlayerRanking)
            }else{
                //IF USER DOESNT EXIST, CREATE DATA ON DB
                myDBObject.ranking = this._iPlayerRanking;
                myDBObject.wins = this._iWins;
                myDBObject.losses = this._iLosses;
                myDBObject.tot_matches = this._iTotMatches;

                myDBObject.save();
            }

        },function(error){
            console.log(error);
        });
    };

    setCurClient(oClient){
        this._oCurClient = oClient;
        if(LOGIN_SECTION){
            this._oLeaderboardController.setCurClient(oClient);
        }
    };

    checkPendingInvitation(){
        this._oInfoAccessRoom = null;
        this._szRoomID = getParameterByName(PARAM_ROOM_ID);
        this._szPass = getParameterByName(PARAM_PASSWORD);

        if(this._szRoomID !== undefined && this._szPass !== null){
            this._oInfoAccessRoom = {id:this._szRoomID,pass:this._szPass};
            this._oModalController.createLoadingPanel();

            this._bJoiningRoom = true;

            window.history.replaceState(
                null,
                null,
                removeParamsFromURL([PARAM_ROOM_ID,PARAM_PASSWORD])
            );
            
            if(this.DYNAMIC_LOADING){
                
                s_oMenu._prepareResources();
            }else{
                s_oNetworkManager.tryJoinFromInvitation(this._szRoomID.toString(), this._szPass.toString());
            }

        }
    };

    onUserLogged(){
        var szNick = s_oNetworkManager.filterString(s_oNetworkManager.getPlayerNickname());

        document.querySelector("#sidebar-section-login span").innerHTML = szNick;

        //SHOW LOGIN SECTION
        document.getElementById("sidebar-section-login").classList.remove('d-none');
        //HIDE LOGIN BUTTON
        document.getElementById("button_login").classList.add('d-none');
        document.getElementById("button_register").classList.add('d-none');
        
        s_oNetworkManager.disconnectFromSystem();
    };    

    onUserLogout(){
        
        this.resetPlayerValues();
        
        document.getElementById("sidebar-section-login").classList.add('d-none');
        document.getElementById("button_login").classList.remove('d-none');
        document.getElementById("button_register").classList.remove('d-none');
 
        if(s_bStorageAvailable){
            localStorage.removeItem(LOCALSTORAGE_STRING+"_player_login");
        }
        
        s_oNetworkManager.generateRandomPlayerName();
        s_oNetworkManager.disconnectFromSystem();
    };
    
    onLogout(){
        s_oNetworkManager.logout();
    };
    
    _joinRoomAsGuest(){
        
    };
    
    onPlayerInfosRetrieved(){
        
    };
    
    calculateBadgeLevelByRanking(iRanking) {
        return this._oLeaderboardController.calculateBadgeLevelByRanking(iRanking);
    };
    
    getBadgePointsByIndex(iLevel){
        return this._oLeaderboardController.getBadgePointsByIndex(iLevel);
    };
    
    getWinPointByRank(iBadgeLevel) {
        return this._oLeaderboardController.getWinPointByRank(iBadgeLevel);
    };
    
    addToGameOptions(szHtml){
    document
        .querySelector("#" + this.GAME_OPTIONS_DIV_ID)
        .insertAdjacentHTML("beforeend", szHtml);
}
    

    
    _showElement(szID){
        document.getElementById( szID ).classList.remove("d-none");
        
        this.refreshSidebarNotificationDot();
    };
    
    _hideElement(szID){
        document.getElementById( szID ).classList.add("d-none");
        
        this.refreshSidebarNotificationDot();
    }
    
    showMainMenuBut(){
        this._showElement("main-menu-but");
    };
    
    hideMainMenuBut() {
        this._hideElement("main-menu-but");
    };
    
    showRestartBut(){
        this._showElement("restart-game-but");
    };
    
    hideRestartBut() {
        this._hideElement("restart-game-but");
    };

    showRemoveAdsButton() {
        this._showElement("remove-ads-side");
    };
    
    hideRemoveAdsButton() {
        this._hideElement("remove-ads-side");
    };
    
    showIOSRestoreButton() {
        this._showElement("restore-side");
    };
    
    hideIOSRestoreButton() {
        this._hideElement("restore-side");
    };
    
    showCartButton() {
        this._showElement("cart-btn");
    };
    
    hideCartButton() {
        this._hideElement("cart-btn");
    };
    
    showBackButton() {
        this._showElement("back-btn");
    };
    
    hideBackButton() {
        this._hideElement("back-btn");
    };
    
    showLangButton() {
        document.getElementById( "but-lang" ).classList.remove("d-none");
    };
    
    hideLangButton() {
        document.getElementById( "but-lang" ).classList.add("d-none");
    };

    showPrivacyButton() {
        this._showElement("privacy-but");
    };
    
    hidePrivacyButton() {
        this._hideElement("privacy-but");
    };
    
    showMusicToggle(){
        this._showElement("music-toggle");
    };
    
    hideMusicToggle(){
        this._hideElement("music-toggle");
    };
    
    showSFXToggle(){
        this._showElement("sfx-toggle");
    };
    
    hideSFXToggle(){
        this._hideElement("sfx-toggle");
    };
    
    ///////////////////MENU SIDEBAR
    __modalCallbacks(){
        var szEvent = "click";
        if(s_bMobile){
            szEvent = "touchend";
        }
        
        let touchStartX = 0;
        let touchStartY = 0;
        let touchMoved  = false;
        const MOVE_THRESHOLD = 10;
        
        if (s_bMobile) {
            document.addEventListener('touchstart', (e) => {
                const t = e.changedTouches[0];
                touchStartX = t.clientX;
                touchStartY = t.clientY;
                touchMoved  = false;
            }, { passive: true });

            document.addEventListener('touchmove', (e) => {
                const t = e.changedTouches[0];
                if (Math.abs(t.clientX - touchStartX) > MOVE_THRESHOLD ||
                    Math.abs(t.clientY - touchStartY) > MOVE_THRESHOLD) {
                    touchMoved = true;
                }
            }, { passive: true });
        }
        
        document.addEventListener(szEvent, (e) => {
            if (s_bMobile && touchMoved) {
                return;
            }
            
            var target = e.target;
            while (target && target.parentNode !== document) {
                if (target.classList.contains('action-show-login')){
                   this._oModalController.createLoginPanel();
                   return;
                }else if(target.classList.contains('action-show-register')){
                    this._oModalController.createRegisterPanel();
                    return;
                }else if(target.classList.contains('action-try-login')){
                    this.onClickSubmitLogin(); 
                    return;
                }else if(target.classList.contains('action-try-register')){
                    this.onClickSubmitRegister();
                    return;
                }else if(target.classList.contains('action-restore-pwd') ){
                    this.onClickRestorePwd(document.getElementById("modal-login-email").value);
                    return;
                }else if(target.classList.contains('action-show-lang')){
                    this._oModalController.createLangPanel();
                    return;
                }else if(target.classList.contains('action-select-lang')){
                    this.onChangeLang(target);
                    return;
                }else if(target.classList.contains("action-hide-sidebar")){
                    var oOffcanvas = document.getElementById("sidebarMenu");
                    oOffcanvas.classList.remove('show');
                    return;
                }else if(target.classList.contains("action-toggle-sidebar") || target.classList.contains("hamburger")){
                    this.toggleSideBar();
                    return;
                }else if(target.classList.contains("action-go-back")){
                    this._oEventListener.triggerEvent(CGUIController.ON_BACK_BUTTON);
                    return;
                }else if(target.classList.contains("action-logout")){
                    this.onLogout();
                    return;
                }else if(target.classList.contains("action-toggle-music")){
                    this.onToggleMusic();
                    return;
                }else if(target.classList.contains("action-toggle-sfx")){
                    this.onToggleSfx();
                    return;
                }else if(target.classList.contains("action-toggle-fullscreen")){
                    this.onToggleFullscreen();
                    return;
                }else if(target.classList.contains('action-goto-menu')){
                    this._oModalController.createConfirmPanel(this._szIdConfirmGotoMenu, TEXT_ARE_YOU_SURE, this._szActionConfirmModals);
                    return;
                }else if(target.classList.contains('action-restart-game')){
                    this._oModalController.createConfirmPanel(this._szIdConfirmRestart, TEXT_ARE_YOU_SURE, this._szActionConfirmModals);
                    return;
                }else if(target.classList.contains('action-not-confirm-in-modal')){
                    //console.log(target.classList)
                    return;
                }else if(target.classList.contains('action-show-leaderboard')){
                    this._oLeaderboardController.getLeaderboardEntries();
                    return;
                }else if(target.classList.contains('action-show-leaderboard-general')){
                    this._oLeaderboardController.onSelectLeaderboardGeneral();
                    return;
                }else if(target.classList.contains('action-show-leaderboard-month')){
                    this._oLeaderboardController.onSelectLeaderboardMonthly();
                    return;
                }else if(target.classList.contains('action-show-leaderboard-day')){
                    this._oLeaderboardController.onSelectLeaderboardDaily();
                    return;
                }else if(target.classList.contains('action-goto-website')){
                    this.onGoToWebSite();
                    return;
                }else if(target.classList.contains('action-show-credits')){
                    this._oModalController.createCreditsPanel();
                    return;
                }else if(target.classList.contains('action-report-bug')){
                    this._oModalController.createContactModal(TEXT_REPORT_BUG, TEXT_SEND_EMAIL, TEXT_SEND_BUGS_PATH);
                    return;
                }else if(target.classList.contains('action-remove-ads')){
                    this.onRemoveAds();
                    return;
                }else if(target.classList.contains('action-confirm-remove-ads-subscription')){
                    this.onAcceptSubscription();
                    return;
                }else if(target.classList.contains('action-confirm-remove-ads-durable')){
                    this.onAcceptRemoveAdsDurable();
                    return;
                }else if(target.classList.contains('action-restore-purchase-ios')){
                    this.onRestoreIOS();
                    return;
                }else if(target.classList.contains('action-confirm-restore-purchase-ios')){
                    this.onConfirmRestoreIOS();
                    return;
                }else if(target.classList.contains('action-show-stats')){
                    this._oModalController.createStatsPanel();
                    return;
                }else if(target.classList.contains('action-show-moregames')){
                    this.onMoreGames();
                    return;
                }else if(target.classList.contains('action-on-privacy')){
                    this.onPrivacy();
                    return;
                }else if(target.classList.contains('action-show-profile')){
                    this._oModalController.createStatsPanel();
                    return;
                }else if(target.classList.contains('action-delete-user')){
                    if(document.querySelector("#statsModal")){
                        document.querySelector(".modal-backdrop").classList.add('d-none');
                        document.querySelector("#statsModal").remove();
                    }
                    this._oModalController.createContactModal(TEXT_DELETE_ACCOUNT, TEXT_DELETE_ACCOUNT_INFO, TEXT_DELETE_PATH);
                    return;
                    
                    ////CUSTOM PARTS
                }else if(target.classList.contains(this._szActionCustomButtons)){
                    this.__triggerCustomButtons(target);
                }else if(target.classList.contains(this._szActionConfirmModals)){
                    this.__triggerConfirmModals(target);
                }
                
                target = target.parentNode;
                if (!target) { return; } // If element doesn't exist
            }
            
        });
    };
    
    __triggerCustomButtons(oTarget){
        //console.log(oTarget.id)
    };
    
    __triggerConfirmModals(oTarget){
        //console.log(oTarget.id)
        switch(oTarget.id){
            case this._szIdConfirmGotoMenu: {
                this.onGotoMenu(); 
                break;
            }
            case this._szIdConfirmRestart: {
                this.onRestartGame(); 
                break;
            }
            
        }
    };
    
    __modalsCallbacks(){
        document.addEventListener('hidden.bs.modal', event => {
            bootstrap.Modal.getInstance(event.target).dispose()
            event.target.remove();
        });
    };
    
    _setSafeArea(){

    };
    
    _setButtonsMarginLeft(iSafeArea){
        var iPx = 10 + iSafeArea;
        var szPX = iPx + "px";
        //var szPerc = this._getPercent(iPx, s_rSafeAreaRectDP.width) +"%";

        document.getElementById( "back-btn" ).style.left = szPX;
        
    };
    
    _setButtonsMarginTop(iSafeArea){
        var iPx = 10 + iSafeArea;
        var szPX = iPx + "px";
        //var szPerc = this._getPercent(iPx, s_rSafeAreaRectDP.height) +"%";
        
        document.getElementById( "toggle-sidebar-btn-top-right" ).style.top = szPX;
        document.getElementById( "close-sidebar-btn" ).style.top = szPX;

        document.getElementById( "cart-btn" ).style.top = szPX;
        
        document.getElementById( "back-btn" ).style.top = szPX;
        
    };
    
    _setSideBarMarginTop(iSafeArea){
        
        if(iSafeArea>0){
            var iPx = iSafeArea;
            var szPX = iPx+"px";
            //document.getElementById( "toggle-sidebar-btn-top-right" ).style.top = szCalc;
            
            document.getElementById( "offcanvas-body" ).style.paddingTop = szPX;
            
            
            var iHeight = 55 + iSafeArea;
            //console.log(document.getElementById( "offcanvas-header" ))
            document.getElementById( "offcanvas-header" ).style.height = iHeight+"px";
            
            
        }else{
            document.getElementById( "toggle-sidebar-btn-top-right" ).style.removeProperty('top');
        }
    };
    
    _setButtonsMarginRight(iSafeArea){
        if(iSafeArea>0){
            var szPX = iSafeArea + "px";
            const hamburgerBox = document.querySelector('.hamburger-box');
            hamburgerBox.style.right = szPX;

            document.getElementById( "close-sidebar-btn" ).style.right = szPX;

            var iPx = 75 + iSafeArea;
            var szPX = iPx + "px";
            document.getElementById( "cart-btn" ).style.right = szPX;
        }
        
    };

    _setSideBarMarginRight(iSafeArea){
        if(iSafeArea>0){
            var szPx = iSafeArea;
            var szCalc = szPx+"px";
            //document.getElementById( "toggle-sidebar-btn-top-right" ).style.left = szCalc;
            
            document.getElementById( "offcanvas-body" ).style.paddingRight = iSafeArea+"px";
        }else{
            //document.getElementById( "toggle-sidebar-btn-top-right" ).style.removeProperty('left');
            document.getElementById( "close-sidebar-btn" ).style.removeProperty('left');
        }
    };
    
    _makeButton(szID, szText, szIcon, szAction, bShowDot){
        var szHtml = "";
        szHtml += '<button id="'+szID+'" type="button" class="btn btn-link text-start '+szAction+'">';
            szHtml += '<span class="icon-wrapper icon-start">';
                szHtml += '<i class="'+szIcon+'"></i>';
                szHtml += '<span class="notification-dot notification-dot-icon ' + (bShowDot ? '' : 'd-none') + '"></span>';
            szHtml += '</span>';
            szHtml += '<span class="element-label">'+szText+'</span>';
        szHtml += '</button>';

        return szHtml;
    }
    
    _makeToggle(szID, szTextOn, szTextOff, szIcon, bEnabled, szAction, bShowDot) {
        var szCurrentText = bEnabled ? szTextOn : szTextOff;

        var szHtml = "";
        szHtml += '<button id="' + szID + '" type="button" '
               + 'class="cursor-pointer form-check form-switch form-check-reverse text-start btn btn-link ' + szAction + '" '
               + 'data-text-on="' + szTextOn + '" '
               + 'data-text-off="' + szTextOff + '">';

        szHtml += '<input class="form-check-input" type="checkbox" '
               + 'style="margin-right:-38px; pointer-events:none;" '
               + 'role="switch" id="' + szID + '_input" '
               + (bEnabled ? 'checked' : '') + '>';

        szHtml += '<span class="icon-wrapper icon-start">';
            szHtml += '<i class="' + szIcon + '"></i>';
            szHtml += '<span class="notification-dot notification-dot-icon ' + (bShowDot ? '' : 'd-none') + '"></span>';
        szHtml += '</span>';

        szHtml += '<span class="element-label">' + szCurrentText + '</span>';
        szHtml += '</button>';

        return szHtml;
    }

    refreshSidebarNotificationDot(){
        var oSidebarBtn = document.getElementById("toggle-sidebar-btn-top-right");
        if (!oSidebarBtn) {
            return;
        }

        var aDots = document.querySelectorAll(
            "#sidebarMenu .notification-dot-icon:not(.d-none)"
        );
        
        //IF BUTTONS ARE HIDE WE DON'T HAVE TO COUNT IT
        var iVisibleDots = 0;
        for (var i = 0; i < aDots.length; i++) {
            var oParentButton = aDots[i].closest("button, a, div");
            if (oParentButton && !oParentButton.classList.contains("d-none")) {
                iVisibleDots++;
            }
        }

        var oMainDot = oSidebarBtn.querySelector(".notification-dot");
        if (!oMainDot) {
            return;
        }

        oMainDot.classList.toggle("d-none", iVisibleDots === 0);
    }

    showNotificationDot(szID, bEnabled){
        var oDot = document.querySelector("#" + szID + " .notification-dot");
        if (oDot) {
            oDot.classList.toggle("d-none", !bEnabled);
        }
        
        this.refreshSidebarNotificationDot();
    }


    toggleSideBar(){
        var oOffcanvas = document.getElementById("sidebarMenu");
                    
        var oCloseBtn = document.getElementById("close-sidebar-btn");
        var oOpenBtn = document.getElementById("toggle-sidebar-btn-top-right");
                    
        if ( oOffcanvas.classList.contains("show")){
            oOffcanvas.classList.remove('show');

            oOpenBtn.classList.remove("d-none");
            oCloseBtn.classList.add("d-none");
            
            document.querySelector(".offcanvas-block").classList.remove("show");
            
            document.querySelector(".action-toggle-sidebar .hamburger").classList.remove("d-none");
        }else{
            oOffcanvas.classList.add('show');
            oOpenBtn.classList.add("d-none");
            oCloseBtn.classList.remove("d-none");
            
            document.querySelector(".offcanvas-block").classList.add("show");                        
        }
    };

    /*
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);

        } else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url);
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        } else {
            // CORS not supported.
            xhr = null;
            return xhr;
        }

        return xhr;
    }
    */
    
    onMoreGames(){
        this._oModalController.createMoreGamesPanel();
    }
   
    onRemoveAds(){

    }
    
    onAcceptSubscription(){

    }
    
    onAcceptRemoveAdsDurable(){

    }
    
    onRestoreIOS(){

    }
   
    onConfirmRestoreIOS(){

    }
   
    onGoToWebSite(){
        if(ALLOW_OUTGOING_LINKS){
            window.open(TEXT_CREDITS_URL,"_blank");
        }
    }
   
    onPrivacy(){
        if(ALLOW_OUTGOING_LINKS){
            window.open(TEXT_PRIVACY_URL,"_blank");
        }
    }
   
    onClickSubmitLogin(){
        this.clearAlertTexts();
        
        var szUser = document.getElementById("modal-login-email").value;
        var szPwd  = document.getElementById("modal-login-pwd").value;
        
        if(szUser === "" || szPwd === ""){
            document.getElementById("login-alert-text").textContent = TEXT_FIELDS_NOT_FILLED;
            return;
        }
        
        this._oModalController.createLoadingPanel();

        s_oNetworkManager.login(szUser,szPwd,this.onLoginPlayer,this.onLoginError);
    };
    
    onClickSubmitRegister(){
        var szNick  = stripHTML(document.getElementById("modal-register-nickname").value);
        var szEmail = stripHTML(document.getElementById("modal-register-email").value);
        var szPwd  = stripHTML(document.getElementById("modal-register-pwd").value);
        var szConfirmPwd  = stripHTML(document.getElementById("modal-register-confirm-pwd").value);
    
        if(szNick === "" || szPwd === "" || szConfirmPwd === "" || szEmail === ""){
            document.getElementById("register-alert-text").textContent = TEXT_FIELDS_NOT_FILLED;
            return;
        }
    
        //CHECK EMAIL
        if(!validateEmail(szEmail)){
            document.getElementById("register-alert-text").textContent = TEXT_EMAIL_NOT_VALID;
            return;
        }
    
        //CHECK IF PASSWORDS ARE MATCHING
        if(szPwd !== szConfirmPwd){
            document.getElementById("register-alert-text").textContent = TEXT_PWD_NOT_MATCHING ;
            return;
        }

        //CHECK PASSWORD LENGTH
        if(szPwd.length <3){
            document.getElementById("register-alert-text").textContent = TEXT_PWD_TOO_SHORT;
            return;
        }

        if(szPwd.length > 10){
            document.getElementById("register-alert-text").textContent =  TEXT_PWD_TOO_LONG;
            return;
        }
        
        this._oModalController.createLoadingPanel();
        s_oNetworkManager.registerUser(szNick,szEmail,szPwd,this.onRegisterPlayer,this.onRegisterError);
    };
    
    clearAlertTexts(){
        document.getElementById("restore-pwd-alert-text").textContent = "";
        document.getElementById("login-alert-text").textContent = "";
    };
    
    onClickRestorePwd(szUser){
        if(szUser === ""){
            s_oGuiController.clearAlertTexts();
             document.getElementById("restore-pwd-alert-text").textContent =  TEXT_INVALID_USER;
        }else{
            s_oNetworkManager.recoverPwd(szUser,this.onPwdRestoreSuccess,this.onPwdRestoreError); 
        }
    };
    
    onPwdRestoreSuccess(){
        this._oModalController.createAlertPanel(TEXT_PWD_RECOVER);
    };
    
    onPwdRestoreError(szNickname){
        s_oGuiController.clearAlertTexts();
        if(validateEmail(szNickname)){
            document.getElementById("restore-pwd-alert-text").textContent =  TEXT_EMAIL_NOT_VALID;
        }else{
            document.getElementById("restore-pwd-alert-text").textContent =  TEXT_INVALID_USER;
        }
    };

    onLoginPlayer(){
        s_oGuiController._oModalController.removeLoadingPanel();
        
        var oModal = document.getElementById("loginModal")
        bootstrap.Modal.getInstance(oModal).hide();
    };
    
    onLoginError(error){
        s_oGuiController._oModalController.removeLoadingPanel();
        
        var szErr = TEXT_GENERIC_LOGIN_FAILED;
        if(!s_oNetworkManager.isOnline()){
            szErr = TEXT_CONNECTION_LOST;
        }
        switch(error.code){
            case "UnknownUser":{
                    szErr = TEXT_INVALID_USER;
                    break;
            }
            case "InvalidPassword":{
                    szErr = TEXT_INVALID_PASSWORD;
                    break;
            }
        }

        s_oGuiController.clearAlertTexts();
        document.getElementById("login-alert-text").textContent = szErr;
    };
    
    onRegisterPlayer(){
        s_oGuiController._oModalController.removeLoadingPanel();
        
        var oModal = document.getElementById("registerModal")
        bootstrap.Modal.getInstance(oModal).hide();
    };
    
    onRegisterError(error){
        s_oGuiController._oModalController.removeLoadingPanel();

        var szErr = TEXT_GENERIC_LOGIN_FAILED;
        if(!s_oNetworkManager.isOnline()){
            szErr = TEXT_CONNECTION_LOST;
        }
        switch(error.code){
            case "UnknownUser":{
                    szErr = TEXT_INVALID_USER;
                    break;
            }
            case "InvalidPassword":{
                    szErr = TEXT_INVALID_PASSWORD;
                    break;
            }
            case "InvalidRegistrationData":{
                    szErr = TEXT_ERR_USER_ALREADY_REGISTERED;
                    break;
            }
        }
        document.getElementById("register-alert-text").textContent = szErr;
    };
    
    onChangeLang(target){
        target = target.firstChild;
                    
        var szClass = target.classList[1];
        var aTmp = szClass.split("bg-");
        var szFlag = aTmp[1];

        var oModal = document.getElementById("languageModal")
        bootstrap.Modal.getInstance(oModal).hide();

        document.getElementById("flag-cur-language").classList.remove('bg-'+s_iStartingLangCode);
        s_iStartingLangCode = szFlag;
        s_iCurLang = LANG_CODES[s_iStartingLangCode];
        refreshLanguage();
        refreshLanguageGUIController();
        this.refreshMenuLanguage();

        this._oEventListener.triggerEvent(CGUIController.ON_SELECT_LANG);

        document.getElementById("flag-cur-language").classList.add('bg-'+s_iStartingLangCode);
    };
    
    refreshMenuLanguage(){
        if(LOGIN_SECTION){
            document.querySelector(".sidebar-menu-container .action-show-profile ").innerHTML = TEXT_MY_PROFILE;
            document.querySelector(".sidebar-menu-container .logged-user .action-logout").innerHTML = TEXT_LOGOUT;
            document.querySelector(".sidebar-menu-container #button_login").innerHTML = TEXT_LOGIN;
            document.querySelector(".sidebar-menu-container #button_register").innerHTML = TEXT_REGISTER;
        }
        
        document.querySelector(".sidebar-menu-container #sidebar-menu-section-title-0").innerHTML = TEXT_SETTINGS;
        document.querySelector(".sidebar-menu-container #sidebar-menu-section-0-0 span").innerHTML = TEXT_LANGUAGE;
        if (SHOW_MOREGAMES) {
            document.querySelector(".sidebar-menu-container .action-show-moregames span").innerHTML = TEXT_MORE_GAMES;
        }
        
        if(ENABLE_FULLSCREEN){
            this._refreshToggleText("fullscreen-toggle", TEXT_FULLSCREEN_ON, TEXT_FULLSCREEN_OFF);
        }
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._refreshToggleText("music-toggle", TEXT_MUSIC_ON, TEXT_MUSIC_OFF);
            this._refreshToggleText("sfx-toggle", TEXT_SFX_ON, TEXT_SFX_OFF);
        }
        
        this._refreshElementText("privacy-but", TEXT_PERSONAL_DATA_MANAGEMENT);

        document.querySelector(".sidebar-menu-container #sidebar-menu-section-title-1").innerHTML = TEXT_GAME_OPTION;
        this._refreshElementText("main-menu-but", TEXT_MAIN_MENU);
        this._refreshElementText("restart-game-but", TEXT_SB_RESTART);

        if(LOGIN_SECTION){
            this._refreshElementText("leaderboard-but", TEXT_LEADERBOARD);

            document.querySelector(".sidebar-menu-container #sidebar-menu-section-title-2").innerHTML = TEXT_MY_PROFILE;
            this._refreshElementText("show-stats-but", TEXT_STATS);
        }
        
        //this._refreshElementText("report-bugs-but", TEXT_REPORT_BUG);

        if(this._szRemoveAdsType){
            this._refreshElementText("remove-ads-side", TEXT_REMOVE_ADS);
            if(isIOS()){
                this._refreshElementText("restore-side", TEXT_SVC_RESTORE);
            }
        }
        
        //document.querySelector(".sidebar-menu-container .action-show-credits span").innerHTML = TEXT_CREDITS;


    };

    _refreshElementText(szID, szText){
        var oElement = document.getElementById(szID);

        var span = oElement.querySelector(".element-label");
        if (span) {
            span.innerHTML = szText;
        }
    }

    _refreshToggleText(szID, szTextOn, szTextOff){
        var toggle = document.getElementById(szID);
        toggle.dataset.textOn = szTextOn;
        toggle.dataset.textOff = szTextOff;
        
        var chk = toggle.querySelector('input[type="checkbox"]');
        
        var szText = (chk && chk.checked) ? szTextOn : szTextOff;
        
        this._refreshElementText(szID, szText);
    };
    
    _setToggleValue(szID, bVal){
        var toggle = document.getElementById(szID);
        if (!toggle) {
            return;
        }
        
        var chk = toggle.querySelector('input[type="checkbox"]');
        if (chk) {
            chk.checked = bVal;
        }
        
        this._refreshToggleText(szID, toggle.dataset.textOn, toggle.dataset.textOff);
    }
    
    onToggleFullscreen(){
        if(s_bFullscreen) { 
            this._fCancelFullScreen.call(window.document);
	}else{
            this._fRequestFullScreen.call(window.document.documentElement);
	}
        
	sizeHandler(); 
    };

    onToggleMusic(){
        muteAllMusic(s_bMusicActive);
        s_bMusicActive = !s_bMusicActive;
        
        this._setToggleValue("music-toggle", s_bMusicActive);
    };
    
    onToggleSfx(){
        muteAllSfx(s_bSfxActive);
        s_bSfxActive = !s_bSfxActive;
        
        this._setToggleValue("sfx-toggle", s_bSfxActive);
    };
    
    onGotoMenu(){
        const modalEl = document.getElementById("confirmModal");

        if (modalEl) {
            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.hide();
        }

        this._oEventListener.triggerEvent(CGUIController.ON_GOTO_MAIN_MENU);
        this.toggleSideBar();
    }
    
    onRestartGame(){
        const modalEl = document.getElementById("confirmModal");

        if (modalEl) {
            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.hide();
        }

        this._oEventListener.triggerEvent(CGUIController.ON_RESTART_GAME);
        
        this.toggleSideBar();
    };
    
    //END################MENU SIDEBAR
    
    getRanking(){
        return this._iPlayerRanking;
    };
    
    getWinMatches(){
        return this._iWins;
    };
    
    getLossMatches(){
        return this._iLosses;
    };
    
    getTotMatches(){
        return this._iTotMatches;
    };
    
    getBadgeLevel(){
        return this._iCurBadgeLevel;
    };
    
    getRoomAccess(){
        return this._oInfoAccessRoom;
    };
    
    getNumBadges(){
        return this._oLeaderboardController.getNumBadges();
    };
    
    
}