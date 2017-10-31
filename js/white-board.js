var $ = require('jquery');

$(window).on('load', function(){
  var $body = $('body');
  var $whiteboard = $('#whiteboard');


  $(function(){
    load_legend();
    load_data();
    init_add_function();
  });



  function init_add_function(){
    var add_icon = "<div id='add_icon'></div>";
    $body.append(add_icon);
  }
  function load_data(){
    $.getJSON( "http://localhost:8892/kemi/wp-content/themes/Webpack/js/ajax/data.json", function( data ) {
      console.log(data);
      var count=Object.keys(data).length;
      $.each( data, function( key, val ) {
        $whiteboard.append("<div id='"+key+"' class='section column-"+count+"'><h1>"+key+"</h1></div>");
        load_project(key,val);
      });
    });
  }

  function load_project(key,val){
    var section = key;
    var data = val;
    $.each( data, function( key, val ) {
      if(val['strat']){
        var strat = "data-strat='"+val['strat']+"'";
      }
      if(val['design']){
        var design = "data-design='"+val['design']+"'";
      }
      if(val['dev']){
        var dev = "data-dev='"+val['dev']+"'";
      }
      var output = "<div class='project'>\
        <div class='project-inner' "+strat+"  "+design+"  "+dev+" >\
          <h2>"+val['name']+"</h2>\
          <p>"+val['content']+"</p>\
        </div>\
      </div>";
      $('#'+section).append(output);
    });
    $('.project').each(function(){
      var count = 0;
      var colorOutput ='';
      var colorindivid ='';
      var array = [];
      $this = $(this).children('.project-inner');
      if($this.data('strat')){
        count++;
        var id = $('.legend[data-id="'+$this.data('strat')+'"]').data('id');
        var role = $('.legend[data-id="'+$this.data('strat')+'"]').data('role');
        var name = $('.legend[data-id="'+$this.data('strat')+'"]').data('name');
        var color = $('.legend[data-id="'+$this.data('strat')+'"]').data('color');
        var data = {id:id, role:role, name:name, color:color};
        array.push(data);
      }
      if($this.data('design')){
        count++;
        var id = $('.legend[data-id="'+$this.data('design')+'"]').data('id');
        var role = $('.legend[data-id="'+$this.data('design')+'"]').data('role');
        var name = $('.legend[data-id="'+$this.data('design')+'"]').data('name');
        var color = $('.legend[data-id="'+$this.data('design')+'"]').data('color');
        var data = {id:id, role:role, name:name, color:color};
        array.push(data);
      }
      if($this.data('dev')){
        count++;
        var id = $('.legend[data-id="'+$this.data('dev')+'"]').data('id');
        var role = $('.legend[data-id="'+$this.data('dev')+'"]').data('role');
        var name = $('.legend[data-id="'+$this.data('dev')+'"]').data('name');
        var color = $('.legend[data-id="'+$this.data('dev')+'"]').data('color');
        var data = {id:id, role:role, name:name, color:color};
        array.push(data);
      }
      var width = 100/count;
      $.each( array, function( key, val ) {
        if(val.color){
          var color="background-color:"+val.color+";";
        }
        colorindivid +="<div class='indiv-color' style='width:"+width+"%; "+ color +"'>\
          <div class='indiv-info'>"+val.name+" - "+val.role+"</div>\
        </div>"
      });
      colorOutput = " <div class='color-bar'>"+colorindivid+"</div>";
      if($(this).find('.color-bar').length === 0){
        $(this).append(colorOutput);
      }
    });
  }

  function load_legend(){
    $body.append('<div id="color-legend"></div>');
    var $legend = $('#color-legend');
    $.getJSON( "http://localhost:8892/kemi/wp-content/themes/Webpack/js/ajax/legend.json", function( data ) {
      $.each( data, function( key, val ) {
        var output = "<div class='legend' style='background-color:"+val['color']+"' data-id='"+key+"' data-role='"+val['role']+"' data-name='"+val['name']+"' data-color='"+val['color']+"'>\
        </div>";
        $legend.append(output);
      });
    });
  }
  function legend_info($this){
    if($('#legend-info').length > 0){
      $('#legend-info').remove();
    }
    var id = $this.data('id');
    var role = $this.data('role');
    var name = $this.data('name');
    var color = $this.data('color');
    var output = "<div id='legend-info'>\
      id: "+id+"<br/>\
      role: "+role+"<br/>\
      name: "+name+"<br/>\
      color: "+color+"<br/>\
    </div>";
    $('#color-legend').prepend(output);
  }

  $body.on('mouseover tap', '.legend',  function(){
    var $this = $(this);
    legend_info($this);
  });
  $body.on('mouseout', '#color-legend',  function(){
    if($('#legend-info').length > 0 ){
      $('#legend-info').remove();
    }
  });
  $body.on('mouseenter tap','.color-bar', function(){
    $(this).find('.indiv-info').css({'display':'block', 'padding':'10px 5px'});
    $(this).find('.indiv-color').height('auto');
    $(this).height('auto');
  }).on('mouseleave', '.color-bar', function(){
    $(this).find('.indiv-info').hide();
    $(this).find('.indiv-color').height('10px');
    $(this).height('auto');
  });
});
