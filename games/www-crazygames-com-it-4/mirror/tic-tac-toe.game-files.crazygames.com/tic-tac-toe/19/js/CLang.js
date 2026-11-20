var TEXT_PL1_VICTORY = "PLAYER 1\n WINS!!!";
var TEXT_PL2_VICTORY = "PLAYER 2\n WINS!!!";
var TEXT_DRAW = "DRAW!!!";
var TEXT_BUT1PLAYER = "CPU";
var TEXT_BUT2PLAYERS = "2 Players";
var TEXT_ACTIVEPLAYER = "Player %s to move";
var TEXT_IOS_PRIVATE = 'Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some info may not save or some features may not work properly';
var TEXT_SAVE_REMOVE = "THIS WILL REMOVE ALL YOUR ACHIEVEMENTS! DO YOU WANT TO PROCEED?";
var TEXT_ARE_SURE = "ARE YOU SURE?";
var TEXT_THINKING = "WAITING OPPONENT\n";

///NEW TEXT
var TEXT_YOU_WIN = "YOU WIN!";
var TEXT_OPPONENT_WIN = "%s WINS!"
var TEXT_CHOOSE_GRID = "CHOOSE THE GRID SIZE";
var TEXT_PLACE_IN_ROW = "PLACE %s IN A ROW";

///NO NEED TRADUCTION
var TEXT_3X3 = "3x3";
var TEXT_5X5 = "5x5";
var TEXT_7X7 = "7x7";

/////
var TEXT_LOCAL_PLAY = "PLAY LOCAL";
var TEXT_LOCAL_PLAY_EXPL = "ON THE SAME DEVICE";
var TEXT_MULTIPLAYER = "MULTIPLAYER";
var TEXT_MULTIPLAYER_EXPL = "PLAY ONLINE";
var TEXT_TRAINING = "TRAINING";
var TEXT_TRAINING_EXPL = "PLAY AGAINST AI";

function refreshLanguage(){
	if(s_iCurLang === LANG_AR){
        s_oCanvas.setAttribute('dir','rtl');
    }else{
        s_oCanvas.setAttribute('dir','ltr');
    }
	
	refreshLanguage_multiplayer();
	
    switch(s_iCurLang){
        case LANG_EN:{
			TEXT_PL1_VICTORY = "PLAYER 1\n WINS!!!";
			TEXT_PL2_VICTORY = "PLAYER 2\n WINS!!!";
			TEXT_DRAW = "DRAW!!!";
			TEXT_BUT1PLAYER = "CPU";
			TEXT_BUT2PLAYERS = "2 Players";
			TEXT_ACTIVEPLAYER = "Player %s to move";
			TEXT_IOS_PRIVATE = 'Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some info may not save or some features may not work properly';
			TEXT_SAVE_REMOVE = "THIS WILL REMOVE ALL YOUR ACHIEVEMENTS! DO YOU WANT TO PROCEED?";
			TEXT_ARE_SURE = "ARE YOU SURE?";
			TEXT_THINKING = "WAITING OPPONENT\n";
			
			TEXT_YOU_WIN = "YOU WIN!";
			TEXT_OPPONENT_WIN = "%s WINS!"
			TEXT_CHOOSE_GRID = "CHOOSE THE GRID SIZE";
			TEXT_PLACE_IN_ROW = "PLACE %s IN A ROW";
			
			TEXT_LOCAL_PLAY = "PLAY LOCAL";
			TEXT_LOCAL_PLAY_EXPL = "ON THE SAME DEVICE";
			TEXT_MULTIPLAYER = "MULTIPLAYER";
			TEXT_MULTIPLAYER_EXPL = "PLAY ONLINE";
			TEXT_TRAINING = "TRAINING";
			TEXT_TRAINING_EXPL = "PLAY AGAINST AI";
			
			break;
		}
		case LANG_ES:{
			TEXT_PL1_VICTORY = "¡EL JUGADOR 1\n GANA!";
			TEXT_PL2_VICTORY = "¡EL JUGADOR 2\n GANA!";
			TEXT_DRAW = "¡EMPATE!";
			TEXT_BUT1PLAYER = "CPU";
			TEXT_BUT2PLAYERS = "2 jugadores";
			TEXT_ACTIVEPLAYER = "Turno del jugador %s";
			TEXT_IOS_PRIVATE = 'Tu navegador web no admite el almacenamiento local de configuraciones. En Safari, la causa más común de esto es usar el "modo de navegación privada". Es posible que parte de la información no se guarde o que algunas funciones no funcionen correctamente';
			TEXT_SAVE_REMOVE = "¡ESTO ELIMINARÁ TODOS TUS LOGROS! ¿QUIERES CONTINUAR?";
			TEXT_ARE_SURE = "¿ESTÁS SEGURO?";
			TEXT_THINKING = "ESPERANDO OPONENTE";
			
			TEXT_YOU_WIN = "¡HAS GANADO!";
			TEXT_OPPONENT_WIN = "¡%s GANA!";
			TEXT_CHOOSE_GRID = "ELIGE EL TAMAÑO DE LA CUADRÍCULA";
			TEXT_PLACE_IN_ROW = "COLOCA %s EN FILA";
			
			TEXT_LOCAL_PLAY = "JUGAR LOCAL";
			TEXT_LOCAL_PLAY_EXPL = "EN EL MISMO DISPOSITIVO";
			TEXT_MULTIPLAYER = "MULTIJUGADOR";
			TEXT_MULTIPLAYER_EXPL = "JUGAR EN LÍNEA";
			TEXT_TRAINING = "ENTRENAMIENTO";
			TEXT_TRAINING_EXPL = "JUGAR CONTRA IA";
			
			break;
		}
		case LANG_FR:{
			TEXT_PL1_VICTORY = "LE JOUEUR 1\n REMPORTE LA VICTOIRE !!!";
			TEXT_PL2_VICTORY = "LE JOUEUR 2\n REMPORTE LA VICTOIRE !!!";
			TEXT_DRAW = "ÉGALITÉ !!!";
			TEXT_BUT1PLAYER = "Ordinateur";
			TEXT_BUT2PLAYERS = "2 joueurs";
			TEXT_ACTIVEPLAYER = "Tour du joueur %s";
			TEXT_IOS_PRIVATE = "Votre navigateur web ne prend pas en charge le stockage local des paramètres. Sous Safari, ce problème est le plus souvent dû à l’utilisation du « mode de navigation privée ». Il est possible que certaines informations ne soient pas enregistrées ou que certaines fonctionnalités ne fonctionnent pas correctement";
			TEXT_SAVE_REMOVE = "CETTE ACTION EFFACERA TOUS VOS SUCCÈS ! VOULEZ-VOUS CONTINUER ?";
			TEXT_ARE_SURE = "ÊTES-VOUS SÛR(E) ?";
			TEXT_THINKING = "EN ATTENTE D’UN ADVERSAIRE";
			
			TEXT_YOU_WIN = "VOUS AVEZ GAGNÉ !";
			TEXT_OPPONENT_WIN = "%s GAGNE !";
			TEXT_CHOOSE_GRID = "CHOISISSEZ LA TAILLE DE LA GRILLE";
			TEXT_PLACE_IN_ROW = "PLACEZ %s À LA SUITE";
			
			TEXT_LOCAL_PLAY = "JOUER EN LOCAL";
			TEXT_LOCAL_PLAY_EXPL = "SUR LE MÊME APPAREIL";
			TEXT_MULTIPLAYER = "MULTIJOUEUR";
			TEXT_MULTIPLAYER_EXPL = "JOUER EN LIGNE";
			TEXT_TRAINING = "ENTRAÎNEMENT";
			TEXT_TRAINING_EXPL = "JOUER CONTRE L'IA";
			
			break;
		}
		case LANG_DE:{
			TEXT_PL1_VICTORY = "SPIELER 1\n GEWINNT!!!";
			TEXT_PL2_VICTORY = "SPIELER 2\n GEWINNT!!!";
			TEXT_DRAW = "UNENTSCHIEDEN!!!";
			TEXT_BUT1PLAYER = "CPU";
			TEXT_BUT2PLAYERS = "2 Spieler";
			TEXT_ACTIVEPLAYER = "Spieler %s ist am Zug";
			TEXT_IOS_PRIVATE = "Dein Webbrowser unterstützt nicht das lokale Speichern von Einstellungen. Bei Safari ist die häufigste Ursache dafür die Verwendung des „Privaten Browsing-Modus“. Einige Informationen werden eventuell nicht gespeichert oder einige Funktionen funktionieren nicht richtig.";
			TEXT_SAVE_REMOVE = "DADURCH WERDEN ALLE DEINE ERRUNGENSCHAFTEN GELÖSCHT! WILLST DU FORTFAHREN?";
			TEXT_ARE_SURE = "GANZ SICHER?";
			TEXT_THINKING = "WARTENDER GEGNER";
			
			TEXT_YOU_WIN = "DU HAST GEWONNEN!";
			TEXT_OPPONENT_WIN = "%s GEWINNT!";
			TEXT_CHOOSE_GRID = "WÄHLE DIE GRÖSSE DES SPIELFELDS";
			TEXT_PLACE_IN_ROW = "PLATZIERE %s IN EINER REIHE";
			
			TEXT_LOCAL_PLAY = "LOKAL SPIELEN";
			TEXT_LOCAL_PLAY_EXPL = "AUF DEM GLEICHEN GERÄT";
			TEXT_MULTIPLAYER = "MEHRSPIELER";
			TEXT_MULTIPLAYER_EXPL = "ONLINE SPIELEN";
			TEXT_TRAINING = "TRAINING";
			TEXT_TRAINING_EXPL = "GEGEN DIE KI SPIELEN";
			
			break;
		}
		case LANG_PT:{
			TEXT_PL1_VICTORY = "O JOGADOR 1\n GANHA!";
			TEXT_PL2_VICTORY = "O JOGADOR 2\n GANHA!";
			TEXT_DRAW = "EMPATE!";
			TEXT_BUT1PLAYER = "CPU";
			TEXT_BUT2PLAYERS = "2 jogadores";
			TEXT_ACTIVEPLAYER = "Turno do jogador %s";
			TEXT_IOS_PRIVATE = 'O teu navegador não suporta o armazenamento local de definições. No Safari, a causa mais comum disso é usar o "modo de navegação privada". Algumas informações podem não ser guardadas ou alguns recursos podem não funcionar correctamente';
			TEXT_SAVE_REMOVE = "ISTO ELIMINARÁ TODAS AS TUAS CONQUISTAS! QUERES CONTINUAR?";
			TEXT_ARE_SURE = "TENS CERTEZA?";
			TEXT_THINKING = "A AGUARDAR PELO ADVERSÁRIO";
			
			TEXT_YOU_WIN = "VOCÊ VENCEU!";
			TEXT_OPPONENT_WIN = "%s VENCE!";
			TEXT_CHOOSE_GRID = "ESCOLHA O TAMANHO DA GRADE";
			TEXT_PLACE_IN_ROW = "COLOQUE %s EM LINHA";
			
			TEXT_LOCAL_PLAY = "JOGAR LOCAL";
			TEXT_LOCAL_PLAY_EXPL = "NO MESMO DISPOSITIVO";
			TEXT_MULTIPLAYER = "MULTIJOGADOR";
			TEXT_MULTIPLAYER_EXPL = "JOGAR ONLINE";
			TEXT_TRAINING = "TREINAMENTO";
			TEXT_TRAINING_EXPL = "JOGAR CONTRA IA";
			
			break;
		}
		case LANG_IT:{
			TEXT_PL1_VICTORY = "IL GIOCATORE 1\n VINCE!!!";
			TEXT_PL2_VICTORY = "IL GIOCATORE 2\n VINCE!!!";
			TEXT_DRAW = "PAREGGIO!!!";
			TEXT_BUT1PLAYER = "CPU";
			TEXT_BUT2PLAYERS = "2 giocatori";
			TEXT_ACTIVEPLAYER = "Turno del giocatore %s";
			TEXT_IOS_PRIVATE = 'Il browser Web non supporta la memorizzazione locale delle impostazioni. In Safari, la causa più comune di questo è l\'utilizzo della "Modalità di navigazione privata". Alcune informazioni potrebbero non essere salvate o alcune funzionalità potrebbero non funzionare correttamente';
			TEXT_SAVE_REMOVE = "CIÒ ELIMINERÀ TUTTI I TUOI RISULTATI! PROCEDERE?";
			TEXT_ARE_SURE = "SICURO?";
			TEXT_THINKING = "IN ATTESA DELL'AVVERSARIO...";
			
			TEXT_YOU_WIN = "HAI VINTO!";
			TEXT_OPPONENT_WIN = "%s VINCE!";
			TEXT_CHOOSE_GRID = "SCEGLI LA DIMENSIONE DELLA GRIGLIA";
			TEXT_PLACE_IN_ROW = "METTI %s IN FILA";
			
			TEXT_LOCAL_PLAY = "GIOCO LOCALE";
			TEXT_LOCAL_PLAY_EXPL = "SULLO STESSO DISPOSITIVO";
			TEXT_MULTIPLAYER = "MULTIGIOCATORE";
			TEXT_MULTIPLAYER_EXPL = "GIOCA ONLINE";
			TEXT_TRAINING = "ALLENAMENTO";
			TEXT_TRAINING_EXPL = "GIOCA CONTRO L'IA";
			
			break;
		}
		case LANG_RU:{
			TEXT_PL1_VICTORY = "ИГРОК 1\n ПОБЕЖДАЕТ!!!";
			TEXT_PL2_VICTORY = "ИГРОК 2\n ПОБЕЖДАЕТ!!!";
			TEXT_DRAW = "НИЧЬЯ!!!";
			TEXT_BUT1PLAYER = "ИИ";
			TEXT_BUT2PLAYERS = "2 игрока";
			TEXT_ACTIVEPLAYER = "Ход игрока %s";
			TEXT_IOS_PRIVATE = "Ваш браузер не поддерживает локальное хранение настроек. В случае браузера Safari самая частая причина — использование режима «Частный доступ». Данные могут не сохраняться или некоторые функции могут работать некорректно";
			TEXT_SAVE_REMOVE = "ВСЕ ВАШИ ДОСТИЖЕНИЯ НЕ СОХРАНЯТСЯ! ПРОДОЛЖИТЬ?";
			TEXT_ARE_SURE = "УВЕРЕНЫ?";
			TEXT_THINKING = "ОЖИДАНИЕ ПРОТИВНИКА";
			
			TEXT_YOU_WIN = "ВЫ ВЫИГРАЛИ!";
			TEXT_OPPONENT_WIN = "%s ПОБЕЖДАЕТ!";
			TEXT_CHOOSE_GRID = "ВЫБЕРИТЕ РАЗМЕР СЕТКИ";
			TEXT_PLACE_IN_ROW = "РАСПОЛОЖИТЕ %s В РЯД";
			
			TEXT_LOCAL_PLAY = "ИГРАТЬ ЛОКАЛЬНО";
			TEXT_LOCAL_PLAY_EXPL = "НА ОДНОМ УСТРОЙСТВЕ";
			TEXT_MULTIPLAYER = "МУЛЬТИПЛЕЕР";
			TEXT_MULTIPLAYER_EXPL = "ИГРАТЬ ОНЛАЙН";
			TEXT_TRAINING = "ТРЕНИРОВКА";
			TEXT_TRAINING_EXPL = "ИГРАТЬ ПРОТИВ ИИ";
			
			break;
		}
		case LANG_TR:{
			TEXT_PL1_VICTORY = "1. OYUNCU\n KAZANDI!!!";
			TEXT_PL2_VICTORY = "2. OYUNCU\n KAZANDI!!!";
			TEXT_DRAW = "BERABERLİK!!!";
			TEXT_BUT1PLAYER = "İŞLEMCİ";
			TEXT_BUT2PLAYERS = "2 oyuncu";
			TEXT_ACTIVEPLAYER = "Oyuncu %s'in sırası";
			TEXT_IOS_PRIVATE = 'Web tarayıcın ayarların yerel olarak depolamasını desteklemiyor. Safari de bunun en yaygın nedeni "Özel Tarama Modu"nu kullanmaktır. Bazı bilgiler kaydedilmeyebilir veya bazı özellikler düzgün çalışmayabilir';
			TEXT_SAVE_REMOVE = "BU TÜM BAŞARILARINI ORTADAN KALDIRACAKTIR! DEVAM ETMEK İSTER MİSİN?";
			TEXT_ARE_SURE = "EMİN MİSİN?";
			TEXT_THINKING = "RAKİP BEKLENİYOR";
			
			TEXT_YOU_WIN = "KAZANDIN!";
			TEXT_OPPONENT_WIN = "%s KAZANDI!";
			TEXT_CHOOSE_GRID = "IZGARA BOYUTUNU SEÇ";
			TEXT_PLACE_IN_ROW = "%s TANESİNİ BİR SIRAYA YERLEŞTİR";
			
			TEXT_LOCAL_PLAY = "YEREL OYNA";
			TEXT_LOCAL_PLAY_EXPL = "AYNI CİHAZDA";
			TEXT_MULTIPLAYER = "ÇOK OYUNCULU";
			TEXT_MULTIPLAYER_EXPL = "ÇEVRİMİÇİ OYNA";
			TEXT_TRAINING = "EĞİTİM";
			TEXT_TRAINING_EXPL = "YAPAY ZEKA İLE OYNA";
			
			break;
		}
		case LANG_AR:{
			TEXT_PL1_VICTORY = "اللاعب 1\n يفوز بالمباراة!!!";
			TEXT_PL2_VICTORY = "اللاعب 2\n يفوز بالمباراة!!!";
			TEXT_DRAW = "تعادل!!!";
			TEXT_BUT1PLAYER = "وحدة المعالجة المركزية";
			TEXT_BUT2PLAYERS = "2 لاعبين";
			TEXT_ACTIVEPLAYER = "%s دور اللاعب";
			TEXT_IOS_PRIVATE = 'لا يدعم متصفح الويب الخاص بك ميزة تخزين الإعدادات محليًا. السبب الأكثر شيوعا لحدوث ذلك في متصفح Safari هو استخدام "وضع التصفح الخاص". ونتيجة لذلك، قد لا يتم حفظ بعض المعلومات أو قد لا تعمل بعض الميزات بشكل صحيح';
			TEXT_SAVE_REMOVE = "سيؤدي هذا إلى إزالة جميع إنجازاتك! هل ترغب في المتابعة؟";
			TEXT_ARE_SURE = "هل أنت متأكد؟";
			TEXT_THINKING = "انتظار الخصم";
			
			TEXT_YOU_WIN = "لقد فزت!";
			TEXT_OPPONENT_WIN = "%s يفوز!";
			TEXT_CHOOSE_GRID = "اختر حجم الشبكة";
			TEXT_PLACE_IN_ROW = "ضع %s في صف";
			
			TEXT_LOCAL_PLAY = "اللعب المحلي";
			TEXT_LOCAL_PLAY_EXPL = "على نفس الجهاز";
			TEXT_MULTIPLAYER = "متعدد اللاعبين";
			TEXT_MULTIPLAYER_EXPL = "اللعب عبر الإنترنت";
			TEXT_TRAINING = "تدريب";
			TEXT_TRAINING_EXPL = "اللعب ضد الذكاء الاصطناعي";
			
			break;
		}
		case LANG_HI:{
			TEXT_PL1_VICTORY = "खिलाड़ी 1\n जीता है!!!";
			TEXT_PL2_VICTORY = "खिलाड़ी 2\n जीता है!!!";
			TEXT_DRAW = "ड्रॉ!!!";
			TEXT_BUT1PLAYER = "CPU";
			TEXT_BUT2PLAYERS = "2 खिलाड़ी";
			TEXT_ACTIVEPLAYER = "खिलाड़ी %s की बारी";
			TEXT_IOS_PRIVATE = "आपका वेब ब्राउज़र स्थानीय रूप से सेटिंग स्टोर करने को सपोर्ट नहीं करता है. Safari में, इसका सबसे सामान्य कारण “निजी ब्राउज़िंग मोड” का इस्तेमाल करना है. हो सकता है कि कुछ जानकारी सेव न हो या कुछ फ़ीचर ठीक से काम न करें";
			TEXT_SAVE_REMOVE = "इससे आपकी सभी उपलब्धियां खत्म हो जाएंगी! क्या आप आगे बढ़ना चाहते हैं?";
			TEXT_ARE_SURE = "क्या आप सुनिश्चित हैं?";
			TEXT_THINKING = "विरोधी का इंतज़ार है";
			
			TEXT_YOU_WIN = "आप जीत गए!";
			TEXT_OPPONENT_WIN = "%s जीतता है!";
			TEXT_CHOOSE_GRID = "ग्रिड का आकार चुनें";
			TEXT_PLACE_IN_ROW = "%s को एक पंक्ति में रखें";
			
			TEXT_LOCAL_PLAY = "स्थानीय खेल";
			TEXT_LOCAL_PLAY_EXPL = "एक ही डिवाइस पर";
			TEXT_MULTIPLAYER = "मल्टीप्लेयर";
			TEXT_MULTIPLAYER_EXPL = "ऑनलाइन खेलें";
			TEXT_TRAINING = "प्रशिक्षण";
			TEXT_TRAINING_EXPL = "एआई के खिलाफ खेलें";
			
			break;
		}
		case LANG_ID:{
			TEXT_PL1_VICTORY = "PEMAIN 1\n MENANG!!!";
			TEXT_PL2_VICTORY = "PEMAIN 2\n MENANG!!!";
			TEXT_DRAW = "SERI!!!";
			TEXT_BUT1PLAYER = "CPU";
			TEXT_BUT2PLAYERS = "2 Pemain";
			TEXT_ACTIVEPLAYER = "Giliran pemain %s";
			TEXT_IOS_PRIVATE = "Browser web kamu tidak mendukung pengaturan penyimpanan secara lokal. Di Safari, penyebab paling umum dari ini adalah penggunaan “Mode Browsing Privat”. Beberapa info mungkin tidak tersimpan atau beberapa fitur mungkin tidak berfungsi dengan baik";
			TEXT_SAVE_REMOVE = "TINDAKAN INI AKAN MENGHAPUS SEMUA PENCAPAIANMU! INGIN MELANJUTKAN?";
			TEXT_ARE_SURE = "KAMU YAKIN?";
			TEXT_THINKING = "MENUNGGU LAWAN";
			
			TEXT_YOU_WIN = "KAMU MENANG!";
			TEXT_OPPONENT_WIN = "%s MENANG!";
			TEXT_CHOOSE_GRID = "PILIH UKURAN GRID";
			TEXT_PLACE_IN_ROW = "TEMPATKAN %s DALAM SATU BARIS";
			
			TEXT_LOCAL_PLAY = "MAIN LOKAL";
			TEXT_LOCAL_PLAY_EXPL = "DI PERANGKAT YANG SAMA";
			TEXT_MULTIPLAYER = "MULTIPEMAIN";
			TEXT_MULTIPLAYER_EXPL = "MAIN ONLINE";
			TEXT_TRAINING = "LATIHAN";
			TEXT_TRAINING_EXPL = "MAIN LAWAN AI";
			
			break;
		}
		case LANG_JA:{
			TEXT_PL1_VICTORY = "プレイヤー 1\n 勝利！！！";
			TEXT_PL2_VICTORY = "プレイヤー 2\n 勝利！！！";
			TEXT_DRAW = "引き分け！！！";
			TEXT_BUT1PLAYER = "CPU";
			TEXT_BUT2PLAYERS = "2 プレイヤー";
			TEXT_ACTIVEPLAYER = "プレイヤー %s のターン"
			TEXT_IOS_PRIVATE = "お使いのウェブブラウザはローカルに設定を保存する機能に対応していません。Safari では、最もあり得る原因として「プライベートブラウジングモード」の使用が考えられます。一部の情報が保存されなかったり、一部の機能がきちんと動作しなかったりすることがあります";
			TEXT_SAVE_REMOVE = "実績がすべて削除されます！本当に実行してよろしいですか？";
			TEXT_ARE_SURE = "本当によろしいですか？";
			TEXT_THINKING = "対戦相手を待っています";
			
			TEXT_YOU_WIN = "あなたの勝ちです！";
			TEXT_OPPONENT_WIN = "%s の勝ちです！";
			TEXT_CHOOSE_GRID = "グリッドサイズを選択してください";
			TEXT_PLACE_IN_ROW = "%s を一列に並べてください";
			
			TEXT_LOCAL_PLAY = "ローカルプレイ";
			TEXT_LOCAL_PLAY_EXPL = "同じデバイスで";
			TEXT_MULTIPLAYER = "マルチプレイヤー";
			TEXT_MULTIPLAYER_EXPL = "オンラインでプレイ";
			TEXT_TRAINING = "トレーニング";
			TEXT_TRAINING_EXPL = "AIと対戦";
			
			break;
		}
		case LANG_ZH:{
			TEXT_PL1_VICTORY = "玩家1\n获胜！！！";
			TEXT_PL2_VICTORY = "玩家2\n获胜！！！";
			TEXT_DRAW = "平局！！！";
			TEXT_BUT1PLAYER = "CPU";
			TEXT_BUT2PLAYERS = "2人";
			TEXT_ACTIVEPLAYER = "玩家 %s 的回合"
			TEXT_IOS_PRIVATE = "你的Web浏览器不支持本地存储设置。如果使用Safari，最可能的原因是开启了“无痕浏览”。可能无法保存信息遗迹及某些功能无法正常运行";
			TEXT_SAVE_REMOVE = "这将删除你的所有成绩！是否继续？";
			TEXT_ARE_SURE = "你确定吗？";
			TEXT_THINKING = "等待对手";
			
			TEXT_YOU_WIN = "你赢了！";
			TEXT_OPPONENT_WIN = "%s 获胜！";
			TEXT_CHOOSE_GRID = "选择网格大小";
			TEXT_PLACE_IN_ROW = "将 %s 排成一行";
			
			TEXT_LOCAL_PLAY = "本地游戏";
			TEXT_LOCAL_PLAY_EXPL = "在同一设备上";
			TEXT_MULTIPLAYER = "多人游戏";
			TEXT_MULTIPLAYER_EXPL = "在线游戏";
			TEXT_TRAINING = "训练";
			TEXT_TRAINING_EXPL = "对抗AI";
			
			break;
		}
	}
}