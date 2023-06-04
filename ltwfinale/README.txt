SONO PRESENTI 9 DIRECTORY:

BOOTSTRAP:
        - pacchetto bootstrap utilizzato per le classi chiamate nei seguenti file html:"html_EC.html", "prodotti.html" e "gioco.html"

MAIN:
	- html_EC.html è la pagina html principale, da qui si ha la visione generale dell'e-commerce e sono presenti i link per le varie altre pagine.
	- functions.js è il file javascript dove sono presenti tutte le funzioni dell’intera applicazione tranne che per il gioco.
	- style_EC.css è la parte css per la pagina principale

PAY_BONUS:
	- checkout.html è la pagina html del checkout
	- lor.html (login or registration) è la pagina dove ti mostra l’opzione di registrazione o di login prima di effettuare il checkout
	- postp.html è la pagina dove si viene reindirizzati dopo il pagamento con l’opzione di tornare alla home o utilizzare i crediti
	- aggiorna_saldo.php e il file php che viene chiamato da richiesta asincrona dopo il pagamento e aggiorna il saldo nella tabella sql
	- aggiorna_bonus.php viene chiamato dal gioco con richiesta Ajax per diminuire di uno il numero di bonus
	- recupera_bonus.php viene chiamata all’inizio del gioco per recuperare il numero di bonus e scriverli nella pagina, sempre con richiesta asincrona 
	- postp.css è il css collegato a checkout.html, lor.html, prodotti.html, paginaProdotto.html, postp.html

C_S:
	- prodotti.html è la pagina dello store 
	- paginaProdotto.html è la pagina dinamica che viene creata in base ai valori passati nella url utilizzando jquery
	- carrello.html è la pagina del carrello che viene creata dinamicamente in base ai valori del carrello salvati int localstorage
	- prodotti.css è il css per lo store

LOGIN:
	- index.html è la pagina html del login con script che usa jQuery per fare i controlli
	- signin.css è il css linkato a index.html
	- login.php è il file php che gestisce i controlli nel database per trovare l’utente e verificare che la password sia corretta

REGISTRAZIONE:
	- index.html è la pagina html della registrazione con script che usa jQuery per fare i controlli
	- signin.css è il css collegato a index.html
	- registration.php controlla che l’email non sia presente e che emailAmico sia presente e poi salva i dati nel database

GIOCODELTA:
	- funGioco.js è il file dove sono presenti tutte le funzioni volte al funzionamento del gioco
	- gioco.html è la pagina html del gioco
	- styleGioco.css è il css linkato a gioco.html
	- in "assets" sono presenti le foto sorgenti per il gioco, in particolare le immagini visualizzate una volta girate le carte
	- in "data" ci sta il file cards.json che viene usato dal file funGioco.js per prendere le immagini e popolare un array che poi verrà riordinato in ordine casuale
          e usato per popolare il gridLayout

IMAGES:
       contiene tutte le foto presenti nell'intero progetto, dai loghi alle immagini dei prodotti. La cartella è a sua volta suddivisa in sottocartelle per
       identificare meglio le immagini.

QUERYPROGETTO.txt:
       contiene le query usate per creare la tabella e le funzioni con trigger associati
