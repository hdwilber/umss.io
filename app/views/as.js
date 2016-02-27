
            spar = $('#main_careers');
            par = $('#careers_row').clone();
            card = par.children(':first-child').clone();
            par.empty();
            spar.empty();

            $('#us-logout').hide();

            $('#us-logout').click (function (e) {
              $.ajax({type: "GET", url:  '/users/logout', dataType: 'json'});
              $(this).toggle();
              $('#ng-username').hide();
              $('#logn_form').show();
            });

            function load_init() {

              $.when (load_careers(), load_novelties()).done(function (careers, novelties) {
              
                cars = careers[0].careers;
                spar = $('#main_careers');
                paraux = null;
                cardaux=null;
                console.log(cars);

                for(i = 0; i < cars.length; i++) {

                  if (i%3 == 0) {
                    paraux = par.clone();
                    spar.append(paraux);
                  }
                  cardaux = card.clone();
                  cardaux.find('#title_career').text(cars[i].name);
                  paraux.append(cardaux);
                  cardaux.find('#id_career').val(cars[i]._id);
                  cardaux.attr('id', 'c'+cars[i]._id);
            $('#'+'mdc'+cars[i]._id).addClass('lol');
                }
                novs = novelties[0].novelties;
                for(i = 0; i<novs.length; i++) {
                  if (novs[i].klass != null) {
                    d = new Date(Date.parse(novs[i].dateTarget));
                      $('#'+'c'+novs[i].klass.career).find('#list_novelties').append('<li>'+ d.toDateString() +' by: ' + novs[i].user.username+ '</li>');
                      
                  }
                }
              });
            };


          $('#form_login_button_submit').click (function (e) {
            e.preventDefault();
            
            var x = $("#login_form").serialize();
            $.ajax({     
              type: "POST",
              url: '/users/login',
              data: x,
              dataType: "json"}
              ).done (function (data) {
              console.log(data);
                  //-var res = $.parseJSON(data);
                  console.log(data);
                  var aux=$('#login_form');

                  $('#ng-username').append($('#login_input_name').val());
                  $('#us-logout').show();

                  aux.hide();
                });

            load_init();
      
        });

        $('#modal_add_career').on('hidden.bs.modal', function () {
            console.log ('closed_modal');
            $('#main_careers').empty();
            load_init();


        })

        $.ajax({type: 'GET', url: '/users/me', dataType: 'json'}).done (function (as) {
          if (as.passport.user != undefined) {
            var aux=$('#login_form');
            $('#ng-username').append($('#login_input_name').val());
            $('#us-logout').show();
            aux.hide();
            load_init();
           }
         });
      
      function load_careers() {
          return $.ajax({ 
            type: "GET",
            url:  '/careers/myList',
            dataType: 'json'
            });


      };
      function load_novelties() {
        return $.ajax({ type: "GET", url:  '/novelties/list', dataType: 'json' });
      };


      $.ajax({ 
            type: "GET",
            url:  '/careers/list',
            dataType: 'json'
            }).done(function (cs) {
              par2 = $('#list_of_careers');
              card2 = par2.children(':first-child').clone();
              spar2 = par2.parent();
              par2.empty();
              paraux2 = par2;
              spar2.empty();
              cardaux2 = card2.clone();

              spar2.append(paraux2);
              cars =cs;
              for(i = 0; i < cars.length; i++) {
                if (i%3 == 0) {
                  paraux2 = par2.clone();
                  spar2.append(paraux2);
                }
                cardaux2 = card2.clone();
                cardaux2.find('#title_career').text(cars[i].name);
                paraux2.append(cardaux2);
                cardaux2.find('#id_career').val(cars[i]._id);
                cardaux2.attr('id', 'mdc'+cars[i]._id);
                btn = cardaux2.find( '#btn_add_career');
                btn.attr('id', 'b'+cars[i]._id);
                btn.click (function (e) {
                  //-console.log('llamando a: '+ $(this).attr('id'));
                  as = $(this).attr('id').substring(1);
                  add_career(as);

                });

                btnrem = cardaux2.find( '#btn_rem_career');
                btnrem.attr('id', 'brem'+cars[i]._id);
                btnrem.click (function (e) {
                  as = $(this).attr('id').substring(4);
                  console.log (as);
                  remove_career(as);
                });
              }
          });

        function add_career(id) {
          $.ajax( {datatype: 'json', type: 'POST', url: '/users/addCareer/'+id}).done(function (s) {
            console.log ('added: '+s);
          });
        }

        function remove_career(id) {
          $.ajax( {datatype: 'json', type: 'POST', url: '/users/removeCareer/'+id}).done(function (s) {
            console.log ('removed: '+s.info);
          });
        }

    });
