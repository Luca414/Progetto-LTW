
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




//per il carrello



function aggiungiAlCarrello(nome, prezzo, immagine) {
	// Crea un nuovo elemento per il prodotto
	var nuovoProdotto = document.createElement('tr');
  
	// Aggiungi l'immagine del prodotto
	var immagineProdotto = document.createElement('img');
	immagineProdotto.src = immagine;
	var immagineCella = document.createElement('td');
	immagineCella.appendChild(immagineProdotto);
	nuovoProdotto.appendChild(immagineCella);
  
	// Aggiungi il nome del prodotto
	var nomeCella = document.createElement('td');
	nomeCella.textContent = nome;
	nuovoProdotto.appendChild(nomeCella);
  
	// Aggiungi il prezzo unitario
	var prezzoCella = document.createElement('td');
	prezzoCella.textContent = prezzo;
	nuovoProdotto.appendChild(prezzoCella);
  
	// Aggiungi la quantità
	var quantitaCella = document.createElement('td');
	var quantitaInput = document.createElement('input');
	quantitaInput.type = 'number';
	quantitaInput.value = 1;
	quantitaInput.min = 1;
	quantitaInput.addEventListener('input', function() {
	  aggiornaPrezzoTotale(nuovoProdotto);
	});
	quantitaCella.appendChild(quantitaInput);
	nuovoProdotto.appendChild(quantitaCella);
  
	// Aggiungi il prezzo totale
	var prezzoTotaleCella = document.createElement('td');
	prezzoTotaleCella.textContent = prezzo;
	nuovoProdotto.appendChild(prezzoTotaleCella);
  
	// Aggiungi il prodotto al carrello
	var carrello = document.getElementById('carrello');
	carrello.appendChild(nuovoProdotto);
  
	// Aggiorna il prezzo totale
	aggiornaPrezzoTotale(nuovoProdotto);
  }
  //rimuove dal carrello un elemento
  function rimuoviDalCarrello(rigaProdotto) {
	rigaProdotto.remove();
	aggiornaPrezzoTotale();
  }

  function aggiornaPrezzoTotale(rigaProdotto) {
	if (!rigaProdotto) {
	  // Se non viene specificata una riga prodotto, calcola il prezzo totaledi tutti i prodotti nel carrello
	  var righeProdotto = document.querySelectorAll('#carrello tr');
	  var prezzoTotale = 0;
	  for (var i = 0; i < righeProdotto.length; i++) {
		var quantita = righeProdotto[i].querySelector('input').value;
		var prezzoUnitario = righeProdotto[i].querySelectorAll('td')[2].textContent;
		prezzoTotale += quantita * prezzoUnitario;
		righeProdotto[i].querySelectorAll('td')[4].textContent = quantita * prezzoUnitario;
	  }
	  document.getElementById('prezzoTotale').textContent = prezzoTotale;
	} else {
	  // Se viene specificata una riga prodotto, calcola il prezzo totale solo per quella riga
	  var quantita = rigaProdotto.querySelector('input').value;
	  var prezzoUnitario = rigaProdotto.querySelectorAll('td')[2].textContent;
	  rigaProdotto.querySelectorAll('td')[4].textContent = quantita * prezzoUnitario;
	  aggiornaPrezzoTotale();
	}
  }
  function vaiAlCarrello(){
	window.location.href="carrello.html";
  }