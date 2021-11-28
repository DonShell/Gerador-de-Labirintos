//define a variavel do labirinto como global
var labirinto;

//essa função faz o script aguardar um tempo antes do proximo comando
function delay(milisegundos) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milisegundos);
}

var preDefinicao;

//cria o objeto labirindo e renderiza ele em uma pagina web
function gerar(){
	
	//pega os valores digitados pelo usuário
	var altura = parseInt(document.getElementById("altura").value);
	var largura =  parseInt(document.getElementById("largura").value);
	var tamanho_passo =  parseInt(document.getElementById("passo").value);


	//preparando cenário
	var cenario_labirinto = document.getElementById("labirinto");
	cenario_labirinto.innerHTML = "";
	cenario_labirinto.style.height = ( altura * passo ) + "px";
	cenario_labirinto.style.width = ( largura * passo ) + "px";


	//personalizando o cenario
	preDefinicao = GerarMolde(altura,largura);
	preDefinicao = GerarQuadrado(preDefinicao,40,40,5,5);
	preDefinicao = GerarQuadrado(preDefinicao,30,30,10,10,true);





	//criando o labirinto
	labirinto = Gerar_Labirinto(altura,largura,preDefinicao);
	
	//percorre a lista de todas as linhas do labirinto
	for(contador = 0 ; contador < labirinto.length ; contador++)
	{ 
		
		//inserindo a linha na pagina, dentro do elemento #labirinto
		var linhaDIV = document.createElement("div");
		//innerHTML("<div class='linha' id='l_" + contador + "'></div>");
	
		//organizando tamanho e posição da linha
		coordenar_linha(linhaDIV, labirinto[contador],tamanho_passo);

		//insere a linha no labirinto
		cenario_labirinto.appendChild(linhaDIV);
	}

}

//reorganiza a linha e insere ela na pagina
//recebe o id do local onde a linha vai
function coordenar_linha(elemento, linha,tamanho_linha)
{

	//deixando sempre do menor para o maior, da esquerda para a direita, de baixo para cima
	var linha_nova = new Linha();

	if(linha.a.x > linha.b.x)
	{
		linha_nova.a.x = linha.b.x;
		linha_nova.b.x = linha.a.x;
	}
	else
	{
		linha_nova.a.x = linha.a.x;
		linha_nova.b.x = linha.b.x;	
	}

	if(linha.a.y > linha.b.y)
	{
		linha_nova.a.y = linha.b.y;
		linha_nova.b.y = linha.a.y;
	}
	else
	{
		linha_nova.a.y = linha.a.y;
		linha_nova.b.y = linha.b.y;	
	}

	//reorganiza os valores de tamanho de cada linha
	var altura = ((linha_nova.b.y - linha_nova.a.y) * tamanho_linha) + 1 ;
	var largura = ((linha_nova.b.x - linha_nova.a.x) * tamanho_linha) + 1;

	//coordenando a linha para seu tamanho, localização e posição correspondente
	elemento.style.top = ( linha_nova.a.y * tamanho_linha) + "px";
	elemento.style.left = ( linha_nova.a.x * tamanho_linha )+ "px";
	elemento.style.width = largura+ "px";
	elemento.style.height = altura + "px";
	elemento.style.position = "absolute";
	elemento.style.backgroundColor = "rgb(0,0,0)";
	
}
