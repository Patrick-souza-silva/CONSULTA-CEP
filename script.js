 $(document).ready(function(){
    
    //Vai pegar o click do botão
   /* $('body').on('click', '#btn', function(){
        consultaCep();
    });*/

    $('form').on('submit', function(e){
        e.preventDefault();
        consultaCep();
    });

    //Criação da função
    function consultaCep(){
        const cep = $('#cep').val();
        //cep.lenght vai contar os caracters
        if(cep.length !== 8){
            //Vai adicionar mensagem de erro para mobile
            $('body').find("#resultados").html('<div id="msg-invalido">Digite o CEP corretamente</div>')
            //return false, vai parar o processo se estiver errado
            return false;
        }

        //Ajuste da API
        loading();
        //função para loading atrasar 2 segundos e aparecer na tela
        setTimeout(function(){
        $.ajax({
            url: 'http://viacep.com.br/ws/'+cep+'/json/',
            type: 'GET',
            dataJQuery: 'json',
            success: function(data){
                console.log(data);
                //Vai jogar as informações e resultados na div criada para essas informações
                $('body').find('#resultados').html('<h2>Resultado da consulta</h2\n'
                                                    + '<p>CEP: '+data.cep+'</p>'
                                                    + '<p>Logradouro: '+data.logradouro+'</p>'
                                                    + '<p>Bairro: '+data.bairro+'</p>'
                                                    + '<p>Cidade: '+data.localidade+'</p>'
                                                    + '<p>Estado: '+data.uf+'</p>'
                                                    + '<p>IBGE: '+data.ibge+'</p>'
                                                    );
                   }
                })
            }, 2000)
        };
    
        //Função para fazer o loading de carreramento
        function loading(){
        $('#resultados').html(/*Gif do loading*/'<img src="loading.gif">')
    }
        //Vai pegar o click na lampada
        $('body').on('click', '#dark-mode', function(){
        //toggleClass vai remover ou tirar a classe
        $('body').toggleClass('modo-noturno');

        //Funções para usar o cookie
        if(Cookies.get('Modo-noturno') == 'on'){
          Cookies.set('Modo-noturno', 'off');
        }else{
            Cookies.set('Modo-noturno', 'on');
        }

    });
        //Vai definir os caracters que vão dentro do campo input
        $('body').on('input', '#cep', function(){
            $(this).val($(this).val().replace(/\D/g, ''));//EXPRESSÕES REGULARES vai pegar togos os caracters - /\D/g
        })

          //Funções para usar o cookie
          if(Cookies.get('Modo-noturno') == 'on'){
            Cookies.set('Modo-noturno', 'off');
           $('body').toggleClass('modo-noturno');   
          }
 })