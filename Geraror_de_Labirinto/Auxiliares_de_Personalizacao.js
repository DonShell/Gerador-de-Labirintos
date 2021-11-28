function GerarMolde(altura,largura){
	var matriz = new Array(altura);
	//Criando matriz de mapeamento
	//true =  parte de labirinto
	//false = parte sem labirinto
	for (var y = 0;y < altura; y++)
	{
		matriz[y] = new Array(largura);
		for (var x = 0; x < altura; x++)
		{
			matriz[y][x] = true;
		}
	}
	
	return matriz;
}

function GerarQuadrado(matriz, altura, largura,localizacao_x = 0 ,localizacao_y = 0, preenchimento = false )
{
	
	for (var y = localizacao_y; y < (altura + localizacao_y); y++)
	{
		for (var x = localizacao_x; x < (largura + localizacao_x); x++)
		{
			matriz[y][x] = preenchimento;
		}
	}
	return matriz;
}
