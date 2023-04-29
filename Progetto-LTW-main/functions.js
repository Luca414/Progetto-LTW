// teniamo lo stato dell'utente

var carrello=[];
function defaultLink(){
	window.location.href="/html_EC.html";
}

function logout(){
	stato.isAuthenticated=false;
	stato.username='';
	carrello=[];
	//document.getElementById("login").style.display='none';
	window.location.href="html_EC.html";
}

function login(username){
	const loggedIn=true;
	/*stato.isAuthenticated=true;
	stato.username=username;*/
	//console.log( "ciao "+username); 
	
	window.location.href="/html_EC.html?loggedIn="+loggedIn;
}
function initialize(){
	const urlParams=new URLSearchParams(window.location.search);
	const loggedIn=urlParams.get('loggedIn');
	if (loggedIn){
		document.getElementById("login").style.display='none';
		document.getElementById("login").style.display='none';

		document.getElementById("registrazione").style.display='none';
		document.getElementById("registrazione").style.display='none';

		document.getElementById("logout").style.display='block';
		document.getElementById("logout").style.display='auto';
	}else{
		document.getElementById("login").style.display='block';
		document.getElementById("login").style.display='auto';

		document.getElementById("registrazione").style.display='block';
		document.getElementById("registrazione").style.display='auto';

		document.getElementById("logout").style.display='none';
		document.getElementById("logout").style.display='none';
	}
}

//creazione pagina dinamica dei prodotti, si crea la url prendendo i dati e poi la pagina paginaprodtto.html  li prende dalla url

function creaNuovaPagina(prodotto) {
	// Selezioniamo gli elementi del prodotto
	var immagine = prodotto.querySelector('img').getAttribute('src');
	var titolo = prodotto.querySelector('h4').textContent;
	var prezzo = prodotto.querySelector('p').textContent.replace('Prezzo: ', '');

    //reindirizzamento
	var nuovaURL = 'paginaProdotto.html?titolo=' + encodeURIComponent(titolo) +
	'&prezzo=' + encodeURIComponent(prezzo) +
	'&immagine=' + encodeURIComponent(immagine);
	window.location.href=nuovaURL;
}

function aggiungiProdotto(nomes,prezzos){
	window.alert("aggiungo diocane");
	var elementi=carrello.find(element=>element.nome==nomes);
	if (elementi) elementi.quantita++;
	else carrello.push({nome:nomes,prezzo:prezzos,quantita:1});
	
	}


function creaProdotto(nome,prezzo){
	return {nome,prezzo};
}
function vaiAlCarrello(){
	if (carrello.length==0){
		window.alert("il carrello è vuoto");
	}else{
		window.location.href="carrello.html";
	}
}

function creaCarrello(){
	const cartItems = document.getElementById("cart-items");
	
		
		
		// Crea un elemento HTML per ogni elemento del carrello
		carrello.forEach((prodotto) => {
			const prodottoElement = document.createElement("div");
			prodottoElement.innerHTML = `
				<h3>${prodotto.nome}</h3>
				<p>Prezzo: ${prodotto.prezzo}€</p>
				<p>Quantità:${prodotto.quantita}</p>
				<button > Rimuovi</button>
			`;
			cartItems.appendChild(prodottoElement);
		});
		
	}
	

