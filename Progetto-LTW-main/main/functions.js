// teniamo lo stato dell'utente


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
		window.location.href="/checkout.html";}
	else window.location.href="/main/html_EC.html";
}
function initialize(){
	var username=localStorage.getItem('username');
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
		document.getElementById("checklogin").innerHTML=`<h4>Ciao </h4>`;
		document.getElementById("checklogin").style.display='block';
		
	}
}

//creazione pagina dinamica dei prodotti, si crea la url prendendo i dati e poi la pagina paginaprodtto.html  li prende dalla url

function creaNuovaPagina(prodotto) {
	// Selezioniamo gli elementi del prodotto
	var immagine = prodotto.querySelector('img').getAttribute('src');
	var titolo = prodotto.querySelector('h4').textContent;
	var prezzo = prodotto.querySelector('p').textContent.replace('Prezzo: ', '');

    //reindirizzamento
	const urlParams=new URLSearchParams(window.location.search);
	
		var nuovaURL = '../c_s/paginaProdotto.html?titolo=' + encodeURIComponent(titolo) +
		'&prezzo=' + encodeURIComponent(prezzo) +
		'&immagine=' + encodeURIComponent(immagine);
	
	window.location.href=nuovaURL;
}
function creaNuovaPaginaS(prodotto) {
	// Selezioniamo gli elementi del prodotto
	var immagine = prodotto.querySelector('img').getAttribute('src');
	var titolo = prodotto.querySelector('h4').textContent;
	var prezzo = prodotto.querySelector('p').textContent.replace('Prezzo: ', '');

    //reindirizzamento
	const urlParams=new URLSearchParams(window.location.search);
	
		var nuovaURL = '../c_s/paginaProdotto.html?titolo=' + encodeURIComponent(titolo) +
		'&prezzo=' + encodeURIComponent(prezzo) +
		'&immagine=' + encodeURIComponent(immagine)+'&store='+true;
	
	window.location.href=nuovaURL;
}

function aggiungiProdotto(nomes,prezzos){
	
	var carrellot=JSON.parse(localStorage.getItem('carrello'))||[];
	var elementi=carrellot.find(element=>element.nome==nomes);
	if (elementi) elementi.quantita++;
	else carrellot.push({nome:nomes,prezzo:prezzos,quantita:1});

	localStorage.setItem('carrello',JSON.stringify(carrellot));
	
	
	}


function creaProdotto(nome,prezzo){
	return {nome,prezzo};
}
function vaiAlCarrello(){
	
		
			window.location.href="/c_s/carrello.html";
		
	
}

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
function svuota(){
	localStorage.removeItem('carrello');
}
function svuota_e(){
	svuota();
	window.location.href="/carrello.html";
}
	function home(username){
		
	if (username!=null&&username!='null'){
		window.location.href=window.location.href="/main/html_EC.html?username="+username;
	}
	else window.location.href="/main/html_EC.html";
	}
	
	function rimuovi(nome){
		window.alert("provo a rimuovere");
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
		vaiAlCarrello();
	}
	function checkout(){
		if (localStorage.getItem('username')==null){
			localStorage.setItem('checking',true);
			window.location.href="/pay_bonus/lor.html";
		}else{
			window.location.href="/pay_bonus/checkout.html"
		}
	}
	function registrazione(){
		window.alert("registrazione completata con successo");
		 
		window.location.href="/login.html";
		
	}

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

	function aggiorna_bonus(){

		// Recupera l'username dal Local Storage
		const username = localStorage.getItem('username');

		// Crea una nuova richiesta XMLHttpRequest
		const xhr = new XMLHttpRequest();

		// Configura la richiesta
		xhr.open('POST', '/pay_bonus/aggiorna_bonus.php', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		// Definisce la funzione da eseguire quando la richiesta ha successo
		xhr.onload = function() {
			const numeroBonus = parseInt(xhr.responseText);
			alert(`Il tuo nuovo numero di bonus è ${numeroBonus}.`);
		};

		// Definisce la funzione da eseguire in caso di errore
		xhr.onerror = function() {
			console.log('Errore durante la richiesta.');
		};

		// Invia la richiesta al server
		xhr.send(`username=${username}`);
	}
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

function aggiorna_saldo(){
		const cifra=parseInt(document.getElementById('totale').innerHTML);
		console.log(cifra);
		const username = localStorage.getItem('username');
		console.log(username);

		// Crea una nuova richiesta XMLHttpRequest
		const xhr = new XMLHttpRequest();

		// Configura la richiesta
		xhr.open('POST', '/pay_bonus/aggiorna_saldo.php', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		// Definisce la funzione da eseguire quando la richiesta ha successo
		xhr.onload = function() {
			svuota();
			const numeroBonus = (xhr.responseText).trim();
			alert(`Il tuo nuovo numero di bonus è ${numeroBonus}.`);
			console.log(numeroBonus);
			window.location.href="postp.html";
		};

		// Definisce la funzione da eseguire in caso di errore
		xhr.onerror = function() {
			console.log('Errore durante la richiesta.');
		};

		// Invia la richiesta al server
		xhr.send(`username=${username}&cifra=${cifra}`);
	}
	