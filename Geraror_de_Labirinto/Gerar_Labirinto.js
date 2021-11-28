//molde de objeto, retorna {x,y} dentro do objeto de origem 
function Dimencoes(x = -1, y = -1){
	var dimencoes = {x,y};
	return dimencoes;
}

//fabrica de objetos para linhas { a:{x,y} , b:{x,y} } sendo a{} inicio e b fim
function Linha( a = { x:0, y:0 }, b = { x:0, y:0 } )
{
	this.a = a;
	this.b = b;
}

//entrar pontos com uma matriz boleana para especificar onde não deve ser gravado nada
function Gerar_Labirinto(altura_do_labirinto,largura_do_labirinto, MatrizDeMoldePersonalizado = false)
{


	//atribui o valor captado para uma variavel global
	tamanho = {
		//+2 para o tamanho das bordas e +1 para o tamanho da linha
		largura:parseInt(largura_do_labirinto)+ 3,
		altura:parseInt(altura_do_labirinto)+ 3
	}

	var pontos = new Array(tamanho.altura);
	//esta matriz especifica quais pontos podem ser usados para traçar uma linha
	//lugar disponivel = true
	//lugar indisponivel = false

	//esta variavel registra cada ponto onde a linha percorrerá
	var rota = new Array();

	//esta variavel é uma lista e será resoponsavel por armazenar a duas localizações que representam a linha 
	//linha[i] = { a:{x,y},b:{x,y} }; 
	this.linhas = new Array();	
	 
	//essa função limpa e inicializa todos os valores para criação de novos labirintos 
	this.inicializar = function()
	{

		//percorre a lista
		for(var y = 0 ; y < tamanho.altura ; y++)
		{ 
			//transforma a lista em matriz
			pontos[y] = new Array(tamanho.largura);
			
			//percorre a matriz
			for(var x = 0 ; x < tamanho.largura ; x++)
			{ 

				//cria um quadrado de false nas bordas da matriz com true's dentro
				pontos[y][x] = !(((y == 0) || (y == tamanho.altura-1)) || ((x == 0) || (x == tamanho.largura-1)));
				// FFFF
				// FTTF
				// FTTF
				// FFFF
			}

		}
	};

	//modifica as condições de cenário para melhor personalização 
	this.personalizar = function()
	{
		//Verificando se foi passado o argumento de personalização
		if(MatrizDeMoldePersonalizado){

			//percorre a matriz
			for(var y = 0; y < MatrizDeMoldePersonalizado.length ; y++)
			{ 
				for(var x = 0; x < MatrizDeMoldePersonalizado[y].length; x++)
				{ 
					//altera os quadrados de pontos disponiveis de acordo com a pré definição caregada

					pontos[y+1][x+1] = pontos[y+1][x+1] && MatrizDeMoldePersonalizado[y][x];
					// FFFFFFFF
					// FTTTTFFF
					// FTTFFTTF
					// FTTTTTTF
					// FFFFFFFF
				
				}

			}
		}
	};

	//esta função cria um novo labirinto
	this.criar = function()
	{
		//este é o ponto inicial onde a linha começará a se desenvolver
		var inicio = varrendoPontosDisponiveis();
		rota[0] = inicio;
		
		//classifica este ponto como invalido para proximas linhas
		pontos[inicio.y][inicio.x] = false;

		//variaveis para facilitar o rota[atual]
		var local = { x:0, y:0 };

		var endereco_rota = 0;

		var contador_linhas = 0;
		
		do { //fica no loop ate todos os pontos serem preenchidos
			
			//alvos é uma lista com objetos {x,y} de lugares disponiveis para traçar uma linha
			alvos = mapear_opcoes(rota[endereco_rota]);
			
			//se houver para onde traçar uma reta
			if (alvos.length){

				//escolhe o alvo e o armazena dentro dea variavel escolha
				var escolha = alvos[ parseInt(Math.random() * alvos.length) ];

				//this.linhas[] = { a:{x,y} , b:{x,y} }
				this.linhas[contador_linhas] = new Linha(rota[endereco_rota],escolha);  
				
				//indica a proxima rota a ser gravada
				contador_linhas++;	
				
				//defite ponto usado na linha como invalido para outras linhas
				pontos[escolha.y][escolha.x] = false;

				//exibe um registro das cordenadas da linha
				//T("ESCOLHA: de x:"+rota[endereco_rota].x+" y:"+rota[endereco_rota].y+" para x:"+escolha.x +" y:"+escolha.y);
				
				//grava a rota que está sendo feita
				endereco_rota = rota.length;
				rota[rota.length] = escolha;
			} 
			//se não houver onde traçar uma reta
			else 
			{
				//recua para tras para tentar traçar outra reta com ponto de partida diferente
				endereco_rota --; 
			}

		}while(!(endereco_rota == -1)) //só sai do loop quando todos os pontos já forem ocupados

	}//fim da funcao criar

	var varrendoPontosDisponiveis = function()
	{

		for (var y = 0;y < tamanho.altura; y++)
		{
			for (var x = 0; x < tamanho.altura; x++)
			{
				if(pontos[y][x])
				{
					localPonto = Dimencoes(x,y);
					return localPonto;	
				}
			}
		}
		return false;
	}

	//esta função recebe um objeto {x,y} com a localização do ponto de partida e retorna uma lista com de objetos {x,y} onde pode ser traçado uma linha 
	var mapear_opcoes = function(local)
	{
		//essa lista armazena todas as rotas possiveis
		opcoes =  new Array(4)

		opcoes[0] =	{//cima
			y:local.y-1,
			x:local.x,
			valor: pontos[local.y-1][local.x]
		};

		opcoes[1] = {//baixo
			y:local.y+1,
			x:local.x,
			valor: pontos[local.y+1][local.x]
		};

		opcoes[2] = {//direita
			y:local.y,
			x:local.x + 1,
			valor: pontos[local.y][local.x+1]
		};
		opcoes[3] = {//esquerda
			y:local.y,
			x:local.x - 1,
			valor: pontos[local.y][local.x-1]
		};
		

		//esta lista armazena apenas os lugares disponiveis
		alvos = Array();
		

		//percorrerá opções
		var contador_alvos = 0 ;
		var contador_opcoes = 0;
		
		//catalogará as opções dentro de alvo
		while(contador_opcoes < opcoes.length){
			if(opcoes[contador_opcoes].valor)
			{
				// grava a lopcalização na lista alvos caso seja uma opção
				// (opcoes[contador].valor) validador, verifica se os lugares de opções estão validos
				alvos[contador_alvos] = Dimencoes( opcoes[contador_opcoes].x , opcoes[contador_opcoes].y );
			
				//sinaliza que o alvo foi gravado
				contador_alvos ++;
			}

			contador_opcoes++;
		}
		return alvos;
	}





	//valida os valores para executar a criação do labirinto
	if((tamanho.altura > 0) && (tamanho.largura > 0))
	{
		//executa a criação
		this.inicializar();
		this.personalizar();
		this.criar()
	}
	else
	{
		this.linhas = "erro: Os valores 'altura' ou 'largura' não podem ser menores que 1";
	}


	return this.linhas;

}


