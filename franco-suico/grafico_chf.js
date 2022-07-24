function grafico() {
  const url30dias = "https://economia.awesomeapi.com.br/json/daily/CHF-BRL/30";
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const retorno = xhttp.responseText;
      const retornoParaObj = JSON.parse(retorno);
      
      //formatar as cotações
      const cotacoes = [];
      const cotacoesFormatadas = []

      for (let i = 0; i < 30; i++) {
        cotacoes[i] = retornoParaObj[i].bid
        cotacoesFormatadas[i] = parseFloat(cotacoes[i]).toFixed(2)
      }

      //guarda os timestamp de todos 30 dias
      const timestamp = [];
      const datas = []
      
      for (let i = 0; i < 30; i++) {
        timestamp[i] = retornoParaObj[i].timestamp;
        datas[i] = new Date(timestamp[i] * 1000)
      }
      
      //guarda as datas formatadas
      const datasFormatadas = []
      
      for (let i = 0; i < 30; i++) {
        datasFormatadas[i] = ("00"+datas[i].getDate()).slice(-2)+"/"+("00"+(datas[i].getMonth()+1)).slice(-2)+"/"+datas[i].getFullYear()
      }
      
      //Inverter a ordem das datas e das cotações para ficar correto no gráfico 
      datasFormatadas.reverse()
      cotacoesFormatadas.reverse()
  
      //Desenhar o grafico
      var ctx = document.getElementById('myChart');
      Chart.defaults.font.size = 11;
      Chart.defaults.color = '#808080';
      const cotGraficco = new Chart(ctx, {
        type: 'line',
        data: {
          labels: datasFormatadas,
          datasets: [{
            label: "Cotação",
            pointRadius: 0,
            data: cotacoesFormatadas,
            borderWidth: 2,
            borderColor: "#1260CC",
						  	  }]
        },
        options: {
          interaction: {
            intersect: false,
            mode: 'index',
          },
        }

      });
    }
  };

  xhttp.open("GET", url30dias, true);
  xhttp.send();
}
grafico()