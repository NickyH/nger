
//dom ready functions
$(function(){
  disable_datepickers();
  $( '.form-horizontal .container' ).parsley( 'validate');
  $('.selectpicker').selectpicker({ size: 5 });
  $('.activity-table-search').on('keyup', get_val_table_ID);
});

function get_val_table_ID () {
  var thisObj = $(this).children('input');
  var tableID = $(this).parents('form').children('table').attr('id');
  table_search(thisObj, tableID);
}

function insert_facility_details_form() {
  $('#insert-form').empty();
  $.get('../forms/form_facilitydetails.html', function(data) {
    $('#insert-form').html(data);
  });
}

function insert_activity_data_form() {
  $('#insert-form').empty();
  $.get('../forms/form_activitydata.html', function(data) {
    $('#insert-form').html(data);
  });
}

$('.select-all').on('click', function() {
  $(this).parent('.col-sm-8').children('.selectpicker').selectpicker('selectAll');
});

$('.select-none').on('click', function() {
  $(this).parent('.col-sm-8').children('.selectpicker').selectpicker('deselectAll');
});

function select_all() {
  $(this).parent().children('.selectpicker').selectpicker('selectAll');
}

function select_none() {
  $(this).parent().children('.selectpicker').selectpicker('deselectAll');
}

$("input[type='text']").on("click", function () {
  $(this).select();
});

function disable_datepickers() {
  $('.input-group-addon').each( function() {
    var disabled = $(this).parents('.input-group').children('.insert-picker').attr('disabled');
    if (disabled === 'disabled') {
      $(this).parents('.input-group').children('.input-group-addon').css('pointer-events', 'none');
    }
  });
}

function warn_cancel_form() {
  bootbox.confirm('Are you sure you want to cancel all changes made to this form?', function (response) {
    if(response) {
      window.location = '/';
    }
  });
}

function warn_close_form() {
  bootbox.confirm('This will permanently close off this issue', function (response) {
    if(response) {
      window.location = '/';
    }
  });
}

function table_search(thisObj, tableID) {
  var $rows = $("#"+tableID+" tr");
  var val = '^(?=.*\\b' + $.trim($(thisObj).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
      reg = RegExp(val, 'i'),
      text;

  $rows.show().filter(function() {
      text = $(this).text().replace(/\s+/g, ' ');
      return !reg.test(text);
  }).hide();
  $('thead tr').show();
}

// datetimepicker
$('.insert-time-picker').datetimepicker({
  format: 'hh:ii',
  language: 'en',
    autoClose: "true",
    startView: 1,
    minView: 0,
    maxView: 1,
    forceParse: 0
});

$('.insert-date-picker').datetimepicker({
  format: 'dd/mm/yyyy',
  language: 'en',
  todayBtn: "linked",
  startView: 3,
    minView: 2,
    maxView: 4,
    autoClose: "true",
    todayHighlight: 1,
    startView: 2,
    forceParse: 1
});

$('.insert-picker').datetimepicker({
    language: 'en',
    weekStart: 1,
    todayBtn: 1,
      autoClose: 1,
      todayHighlight: 1,
      startView: 2,
      forceParse: 0,
    showMeridian: 1
});
