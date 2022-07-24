const moedasUrl = "https://economia.awesomeapi.com.br/json/last/CAD-BRL"
const http = new XMLHttpRequest()

function pegarValor(resposta) {
  const resCotacao = resposta
  const cotacaoObj = JSON.parse(resCotacao)
  const preco = cotacaoObj.CADBRL.bid
  const precoFloat = parseFloat(preco)
  return precoFloat.toFixed(2)
}

function atualizarInput(cotacao) {
  const input1 = document.getElementById("entrada-1")
  const input2 = document.getElementById("entrada-2")
  input2.value = cotacao
  document.getElementById("atual").innerHTML = cotacao
  input1.addEventListener("keyup", function() {
    const resultado = input1.value * cotacao
    input2.value = resultado.toFixed(2)
  })
  input2.addEventListener("keyup", function() {
    const resultado = input2.value / cotacao
    input1.value = resultado.toFixed(2)
  })
}

function atualizarData(resposta) {
  const returnString = resposta
  const returnObg = JSON.parse(returnString)
  const dataTime = returnObg.CADBRL.timestamp
  const dataParaInt = parseInt(dataTime)
  const dataFormatada = new Date(dataParaInt * 1000)
  const dia = ("00"+dataFormatada.getDate()).slice(-2)
  const mes = ("00"+(dataFormatada.getMonth()+1)).slice(-2)
  const ano = dataFormatada.getFullYear()
  document.getElementById("data").innerHTML = dia+"/"+mes+"/"+ano
  return dia+"/"+mes+"/"+ano
}

http.onreadystatechange = function cotacao() {
  if (http.status == 200 && http.readyState == 4) {
    const preco = pegarValor(http.responseText)
    atualizarInput(preco)
    atualizarData(http.responseText)
  }
}

http.open("GET", moedasUrl, true)
http.send()