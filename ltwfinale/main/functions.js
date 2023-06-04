


function defaultLink(){
	window.location.href="/main/html_EC.html";
}
function vaiAlloStore(){ 
	window.location.href="/c_s/prodotti.html";
}
function logout(){
	
	localStorage.removeItem('username');
	localStorage.removeItem('nome');
	window.location.href="html_EC.html";
}

function login(username,nome){
	localStorage.setItem('username',username);
	localStorage.setItem('nome',nome);
	
	if (localStorage.getItem('checking')){ 
		localStorage.removeItem('checking');
		window.location.href="/pay_bonus/checkout.html";}
	else window.location.href="/main/html_EC.html";
}

//funzione che inizializza la pagina principale
function initialize(){
	var username=localStorage.getItem('username');
	var checking=localStorage.getItem('checking');
	if (checking!==null)
		localStorage.removeItem('checking');
	if (username!==null){
		document.getElementById("login").style.display='none';
		document.getElementById("login").style.pointerEvents='none';

		document.getElementById("registrazione").style.display='none';
		document.getElementById("registrazione").style.pointerEvents='none';

		document.getElementById("logout").style.display='block';
		document.getElementById("logout").style.pointerEvents='auto';
	}else{
		
		document.getElementById("login").style.display='block';
		document.getElementById("login").style.pointerEvents='auto';

		document.getElementById("registrazione").style.display='block';
		document.getElementById("registrazione").style.pointerEvents='auto';

		document.getElementById("logout").style.display='none';
		document.getElementById("logout").style.pointerEvents='none';
		var nome=localStorage.getItem('nome');
		
		
	}
}

//creazione pagina dinamica dei prodotti, si crea la url prendendo i dati e poi la pagina paginaprodtto.html  li prende dalla url

function creaNuovaPagina(prodotto) {
	// Selezioniamo gli elementi del prodotto
	var immagine = prodotto.querySelector('img').getAttribute('src');
	var titolo = prodotto.querySelector('h4').textContent;
	var prezzo = prodotto.querySelector('p').textContent.replace('Prezzo: ', '');

    //reindirizzamento
	
	
		var nuovaURL = '../c_s/paginaProdotto.html?titolo=' + encodeURIComponent(titolo) +
		'&prezzo=' + encodeURIComponent(prezzo) +
		'&immagine=' + encodeURIComponent(immagine);
	
	window.location.href=nuovaURL;
}

//uguale a creanuovapagina ma legata allo store, aggiungiamo nella url il valore store per mettere un pulsante diverso
function creaNuovaPaginaS(prodotto) {
	// Selezioniamo gli elementi del prodotto
	var immagine = prodotto.querySelector('img').getAttribute('src');
	var titolo = prodotto.querySelector('h4').textContent;
	var prezzo = prodotto.querySelector('p').textContent.replace('Prezzo: ', '');

    //reindirizzamento
	
	
		var nuovaURL = '../c_s/paginaProdotto.html?titolo=' + encodeURIComponent(titolo) +
		'&prezzo=' + encodeURIComponent(prezzo) +
		'&immagine=' + encodeURIComponent(immagine)+'&store='+true;
	
	window.location.href=nuovaURL;
}
//aggiunge i prodotti al carrello
function aggiungiProdotto(nomes,prezzos){
	
	var carrellot=JSON.parse(localStorage.getItem('carrello'))||[];
	var elementi=carrellot.find(element=>element.nome==nomes);
	if (elementi) elementi.quantita++;
	else carrellot.push({nome:nomes,prezzo:prezzos,quantita:1});

	localStorage.setItem('carrello',JSON.stringify(carrellot));

	showAlert("Prodotto aggiunto al carrello!");
	
	
}
//funzione come creaNuovaPagina ma legata ai prodotti in offerta che hanno una struttura diversa
function paginaOfferta(){
	var prodotto=document.getElementById("offerta");
	var immagine = prodotto.querySelector('img').getAttribute('src');
	var titolo = prodotto.querySelector('h1').textContent;
	
	var nuovaURL = '../c_s/paginaProdotto.html?titolo=' + encodeURIComponent(titolo) +
		'&prezzo=$70'  +
		'&immagine=' + encodeURIComponent(immagine);
	
	window.location.href=nuovaURL;

}



function creaProdotto(nome,prezzo){
	return {nome,prezzo};
}
function vaiAlCarrello(){
	
		
			window.location.href="/c_s/carrello.html";
		
	
}
//funzione legata all'evento onload di carrello.html per la creazione del carrello
function creaCarrello(){
	const cartItems = document.getElementById("cart-items");
	var carrellot=JSON.parse(localStorage.getItem('carrello'))||[];
	if (carrellot.length>0){
		
		
		// Crea un elemento HTML per ogni elemento del carrello
		carrellot.forEach((prodotto) => {
			const prodottoElement = document.createElement("div");
			prodottoElement.innerHTML = `
				<h3>${prodotto.nome}</h3>
				<p>Prezzo: ${prodotto.prezzo}€</p>
				<p>Quantità:${prodotto.quantita}</p>
				<button class="btn" onclick="rimuovi('${prodotto.nome}')">Rimuovi</button>
			`;
			cartItems.appendChild(prodottoElement);
		});}else{
			const prodottoElement=document.createElement("div");
			prodottoElement.innerHTML='<h3>Il carrello è vuoto<h3>';
			cartItems.appendChild(prodottoElement);
			document.getElementById("checkout").style.display='none';
			document.getElementById("svuota").style.display='none';
		}
		
	}
//funzioni per svuotare il carrello o rimuovere elementi
function svuota(){
	localStorage.removeItem('carrello');
}
function svuota_e(){
	svuota();
	window.location.href="/c_s/carrello.html";
}
	
	
	function rimuovi(nome){
		
		var carrellot=JSON.parse(localStorage.getItem('carrello'))||[];
		var elementi=carrellot.find(element=>element.nome==nome);
		if (elementi.quantita==1){
			carrellot=carrellot.filter(function(item){
				return item.nome!=elementi.nome;
			})
			
		}else{
			elementi.quantita--;
		}
		localStorage.setItem('carrello',JSON.stringify(carrellot));
		showAlert("elemento rimosso correttamente")
	}
	//funzione che controlla se l'utente è loggato prima del checkout
	function checkout(){
		if (localStorage.getItem('username')==null){
			localStorage.setItem('checking',true);
			window.location.href="/pay_bonus/lor.html";
		}else{
			window.location.href="/pay_bonus/checkout.html"
		}
	}

	//funzioni ajax per recuperare i bonus
	function controlla_bonus(){
		const username = localStorage.getItem('username');

		// Crea un nuovo oggetto XMLHttpRequest
		const xhr = new XMLHttpRequest();

		// Imposta l'URL della richiesta
		xhr.open('POST', '/pay_bonus/recupera_bonus.php', true);

		// Imposta l'header della richiesta
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		// Imposta la funzione da eseguire quando la richiesta viene completata
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				const numeroBonus = parseInt(this.responseText);
				alert(`Hai ${numeroBonus} bonus.`);
			}
		};

		// Invia la richiesta
		xhr.send(`username=${username}`);
	}
	//legata a aggiorna_bonus.php serve per ridurre di uno i bonus
	function aggiorna_bonus(){

		
		const username = localStorage.getItem('username');

		
		const xhr = new XMLHttpRequest();

		
		xhr.open('POST', '/pay_bonus/aggiorna_bonus.php', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		
		xhr.onload = function() {
			const numeroBonus = xhr.responseText.trim();
			alert(`Il tuo nuovo numero di bonus è ${numeroBonus}.`);
		};

		
		xhr.onerror = function() {
			console.log('Errore durante la richiesta.');
		};

		
		xhr.send(`username=${username}`);
	}
//calcola il totale del carrello e lo setta nella pagina checkout.html
function totale() {
		var somma = 0;
		var carrello = JSON.parse(localStorage.getItem('carrello'));
		
		for (var i = 0; i < carrello.length; i++) {
		  var prezzoSenzaSimbolo = carrello[i].prezzo.replace("$", "").trim();
		  var prezzoNumerico = parseFloat(prezzoSenzaSimbolo);
		  
		  somma += prezzoNumerico*carrello[i].quantita;
		}
		
		document.getElementById('totale').innerHTML = somma;
	}
//aggiunge il saldo nella tabella sql con richiesta ajax dopo il pagamento
function aggiorna_saldo(){
		const cifra=parseInt(document.getElementById('totale').innerHTML);
		console.log(cifra);
		const username = localStorage.getItem('username');
		console.log(username);

		
		const xhr = new XMLHttpRequest();

		
		xhr.open('POST', '/pay_bonus/aggiorna_saldo.php', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		
		xhr.onload = function() {
			svuota();
			const numeroBonus = (xhr.responseText).trim();
			
			console.log(numeroBonus);
			window.location.href="postp.html";
		};

		
		xhr.onerror = function() {
			console.log('Errore durante la richiesta.');
		};

		
		xhr.send(`username=${username}&cifra=${cifra}`);
	}

	//controlla che l'utente sia loggato prima di reindirizzare alla pagina del gioco
	function gioco(){
		if (localStorage.getItem('username')){
			window.location.href="/giocoDelta/gioco.html";
		}
		else{
			showAlert("Effettua prima il login");
		}
	}
	//funzioni per gestire l'alert personalizzato
	function closeAlert(){
		var customAlert=document.querySelector('.custom-alert');
		customAlert.style.display='none';
	}
	function showAlert(stringa){
		var alert=document.querySelector('.custom-alert');
		alert.querySelector('h2').innerHTML=stringa;
		alert.style.display='flex';
	}

	//serve per mostrare l'errore in caso il file login.php riscontri problemi
	function vaiAlLogin(stringa){
		localStorage.setItem('errore',stringa);
		window.location.href="/login/index.html";
		
	}
	//questa è legata all'onload di registrazione e login per mostrare l'errore da php
	function controllaErrori(){
		if (localStorage.getItem('errore')!==null){
			showAlert(localStorage.getItem('errore'));
			localStorage.removeItem('errore');
		}
	}
	//uguale a vaiAlLogin
	function vaiAllaReg(stringa){
		localStorage.setItem('errore',stringa);
		window.location.href="/registrazione/index.html";
	}
	