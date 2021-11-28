


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

function Gerar_Labirinto(altura_do_labirinto,largura_do_labirinto) //entrar com objeto{ inteiro altura, inteiro largura}
{

	//atribui o valor captado para uma variavel global
	this.tamanho = {
		//+2 para as bordas e +1 para que sempre renderize ao menos 2 dimenções
		largura:parseInt(largura_do_labirinto)+ 4,
		altura:parseInt(altura_do_labirinto)+ 4
	}
	//esta variavel registra cada ponto onde a linha percorrerá
	var rota = new Array();

	//esta matriz especifica quais pontos podem ser usados para traçar uma linha
	//lugar disponivel = true
	//lugar indisponivel = false
	var pontos = new Array(this.tamanho.altura);

	//esta variavel é uma lista e será resoponsavel por armazenar a duas localizações que representam a linha 
	//linha[i] = { a:{x,y},b:{x,y} }; 
	this.linhas;
	 
	//essa função limpa e inicializa todos os valores para criação de novos labirintos 
	this.limpar = function()
	{
		this.linhas = new Array();
		
		//percorre a lista
		for(var y = 0 ; y < this.tamanho.altura ; y++)
		{ 
			//transforma a lista em matriz
			pontos[y] = new Array(this.tamanho.largura);
			
			//percorre a matriz
			for(var x = 0 ; x < this.tamanho.largura ; x++)
			{ 

				//cria um quadrado de false nas bordas da matriz com true's dentro
				pontos[y][x] = !(((y == 0) || (y == this.tamanho.altura-1)) || ((x == 0) || (x == this.tamanho.largura-1)));
				// FFFF
				// FTTF
				// FTTF
				// FFFF
			}

		}
	};


	//esta função cria um novo labirinto
	this.criar = function( altura = this.tamanho.altura,  largura = this.tamanho.largura)
	{
		//dá a opção de trocar o tamaho sempre quando for criar
		this.tamanho.altura = altura;
		this.tamanho.largura = largura;

		//if(this.tamanho.altura )

		//garante que as variaveis foram limpas e declaradas
		this.limpar();


		//este é o ponto inicial onde a linha começará a se desenvolver
		var inicio = Dimencoes(1,1);
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

}


