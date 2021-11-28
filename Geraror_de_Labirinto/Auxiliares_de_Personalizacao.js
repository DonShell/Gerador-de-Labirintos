function GerarRetangulo(altura,largura,preenchimento = true){
	
	//Criando matriz
	
	var matriz = new Array();
	//true =  parte de labirinto
	//false = parte sem labirinto
	for (var y = 0;y < altura; y++)
	{
		matriz[y] = new Array();
		for (var x = 0; x < altura; x++)
		{
			matriz[y][x] = preenchimento;
		}
	}
	
	return matriz;
}


//Utilize apenas matrizes que contem o indice 0 com a largura maxima
function MesclarMatriz(matriz_1, matriz_2,margemTopo = 0 ,margemEsquerda = 0,tipoDeMescla = "sobrepor")
{

	var altura,largura;
	if (matriz_1.length < matriz_2.length)
	{
		altura = matriz_2.length
	}
	else
	{
		altura = matriz_1.length
	}  

	if (matriz_1[0].length < matriz_2[0].length)
	{
		largura = matriz_2[0].length
	}
	else
	{
		largura = matriz_1[0].length
	}  


	matriz_resultante = matriz_1;


	//percorrendo e gerando a matrizresultante
	for (var y = margemTopo; y < altura; y++)
	{
		//cria a linha caso ela não exista
		if ((typeof matriz_resultante[y])=="undefined"){
			matriz_resultante[y] = new Array(largura);
		}
		
		// só contiunua pergorrendo a matriz caso a segunda matriz possua valor nesta linha
		if ((typeof matriz_2[y-margemTopo])!="undefined")
		{

			for (var x = margemEsquerda; x < largura; x++)
			{
				//se um dos argumentos não foi definido, defina-os
				if ((typeof matriz_1[y][x])=="undefined")
				{
					matriz_1[y][x] = false;
				}
				//se o local da segunda matriz existir então ele executa a mescla do valor
				if (typeof matriz_2[y-margemTopo][x-margemEsquerda]!="undefined")
				{
					matriz_resultante[y][x] = MesclarValores[tipoDeMescla](matriz_1[y][x], matriz_2[y-margemTopo][x-margemEsquerda] );
				}
			}
		}
	}
	return matriz_resultante;
}

function Quadrado(tamanho = 2, preenchimento = true )
{
	return GerarRetangulo(tamanho,tamanho, preenchimento);
}

function MostrarMatrizEmConsole(matriz)
{
	var linha = "  ";
	for (var x = 0;x < matriz[0].length; x++)
	{
		linha = linha + " " + x;
	}
	console.log(linha);


	for (var y = 0;y < matriz.length; y++)
	{
		linha = y + "|";
		for (var x = 0; x < matriz[y].length; x++)
		{
			linha = linha + " " + (matriz[y][x] * 1);
		}
		console.log(linha + "|");
	}
	console.log("");
}


function MesclaCentralizada (matriz_1,matriz_2,tipoDeMescla = "sobrepor")
{
	margemTopo = parseInt((matriz_1.length/2) - (matriz_2.length/2));
	margemEsquerda =  parseInt((matriz_1[0].length/2) - (matriz_2[0].length/2));

	return MesclarMatriz(matriz_1,matriz_2,margemTopo,margemEsquerda,tipoDeMescla);
}

const MesclarValores = new Array(4);
MesclarValores["e"] = function(...valor)
	{
		var resultado = valor[0];
		for (var contador = 1; contador < valor.length ;contador++)
		{
			resultado = resultado && valor[contador];
		}
		return resultado;
	};
MesclarValores["ou"] = function(...valor)
	{
		var resultado = valor[0];
		for (var contador = 1; contador < valor.length ;contador++)
		{
			resultado = resultado || valor[contador];
		}
		return resultado;
	};

	//ultimo argumento é o que prevalece
MesclarValores["sobrepor"] = function(...valor)
	{
		var resultado = valor[0];
		for (var contador = 1; contador < valor.length ;contador++)
		{
			resultado = valor[contador];
		}
		return resultado;
	};


