$(function() {

  $.fn.anychange = function(fn) {
    $(this).change(fn).keyup(fn).each(fn);
  };

  $.fn.nval = function(v) {
    if (parseInt(v, 10) == v) {
      v = parseInt(v, 10);
    }else{
      v = parseFloat(v, 10);
      v = v ? sprintf('%.2f', v) : '0';
    }
    $(this).val(Math.max(0,v));
    return this;
  };

  ['#', '#sms-'].forEach(function(prefix) {
    var skipCalc = false;
    var calcPercent = function() {
      if (skipCalc) return;
      var o = parseFloat($(prefix+'offpeak-monthly').val()),
          p = parseFloat($(prefix+'peak-monthly').val());

      if (o+p <= 0) return;
      $(prefix+'percent').nval(p/(o+p)*100);
    };

    $(prefix+'percent').anychange(function() {
      skipCalc = true;
      var total = parseFloat($(prefix+'offpeak-monthly').val()) + parseFloat($(prefix+'peak-monthly').val());
      var percent = parseFloat($(this).val());

      $(prefix+'peak-monthly').nval((percent/100) * total).change();
      $(prefix+'offpeak-monthly').nval(total - (percent/100) * total).change();
      skipCalc = false;
    });

    ['offpeak', 'peak'].forEach(function(peak) {
      $(prefix+peak+'-daily').anychange(function() {
        $(prefix+peak+'-monthly').nval(parseFloat($(this).val())*30);
        calcPercent();
      });
      $(prefix+peak+'-monthly').anychange(function() {
        $(prefix+peak+'-daily').nval(parseFloat($(this).val())/30);
        calcPercent();
      });
    });
  });
});
