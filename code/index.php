<?php

function control($id, $caption, $options) {
?>
<div class="clearfix">
 <label for="<?php echo HTML($id); ?>"><?php echo HTML($caption); ?></label>
 <div class="input">
   <div class="<?php echo ARR($options, 'inner-class'); ?>">
     <?php if ($prepend = ARR($options, 'prepend')) { ?>
      <span class="add-on"><?php echo HTML($prepend); ?></span>
     <?php } ?>
     <input<?php echo html_attributes(array(
       'id' => $id, 'value' => ARR($options, 'default'),
       'type' => 'text', 'class' => ARR($options, 'size', 'small')
     )); ?> />
     <?php if ($append = ARR($options, 'append')) { ?>
      <span class="add-on"><?php echo HTML($append); ?></span>
     <?php } ?>
   </div>
 </div>
</div>
<?php
}

function prepend_control($id, $caption, $prepend, $default) {
  control($id, $caption, array(
    'default' => $default,
    'inner-class' => 'input-prepend',
    'prepend' => $prepend
  ));
}

function append_control($id, $caption, $append, $default) {
  control($id, $caption, array(
    'default' => $default,
    'inner-class' => 'input-append',
    'append' => $append
  ));
}

?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><html>
<link rel="stylesheet" href="/ext/bootstrap/bootstrap-1.1.1.min.css">
<link rel="stylesheet" href="/css/header.css">
<script src="/ext/jquery/jquery-min.js"></script>
<script src="/ext/jquery/jquery.tablesorter-min.js"></script>
<script src="/js/sprintf.js"></script>
<script src="/js/form.js"></script>
<script src="/js/packages.js"></script>
<script src="/js/generated.js"></script>
<script src="/js/fill.js"></script>
<script src="/js/table.js"></script>
</head>
<body>
<div id="header">
 <div class="inner">
  <div class="container">
   <h1>WhichContract.co.za</h1>
   <p class="lead">WhichContract helps calculate the best contract choice by comparing <strong>8ta</strong>, <strong>CellC</strong>, <strong>MTN</strong> and <strong>Vodacom</strong>.</p>
   <small>&ldquo;<em>This is awesome.</em>&rdquo; &ndash; Josh</small>
  </div>
 </div>
</div>
<div id="popover" class="popover right">
  <div class="arrow"></div>
  <div class="inner" style="width: 480px;">
    <h3 class="title">Popover Title</h3>
    <div class="content">
    </div>
  </div>
</div>
<div class="container">
 <section id="setup">
  <div class="page-header">
   <h1>What do you use?</h1>
  </div>
  <div class="row">
   <div class="span4 columns">
    <strong>How often do you call people?</strong>
    <p>Let us know how often you make calls so we can help work out what you would need to pay each provider.</p>
   </div>
   <div class="span6 columns">
     <?php append_control('peak-daily', 'Peak daily', 'min', 0); ?>
     <?php append_control('offpeak-daily', 'Offpeak daily', 'min', 0); ?>
     <?php append_control('percent', 'Percent peak', '%', 0); ?>
   </div>
   <div class="span6 columns">
    <?php append_control('peak-monthly', 'Peak monthly', 'min', 0); ?>
    <?php append_control('offpeak-monthly', 'Offpeak monthly', 'min', 0); ?>
   </div>
  </div>
  <div class="row">
   <div class="span4 columns">
    <strong>How often do you sms?</strong>
    <p>We'll try find a bundle that fits your needs and factor that into the cost</p>
   </div>
   <div class="span6 columns">
    <?php append_control('sms-peak-daily', 'Peak SMS Daily', 'x', 0); ?>
    <?php append_control('sms-offpeak-daily', 'Offpeak SMS Daily', 'x', 0); ?>
    <?php append_control('sms-percent', 'Percent peak', '%', 0); ?>
   </div>
   <div class="span6 columns">
    <?php append_control('sms-peak-monthly', 'Peak SMS Monthly', 'x', 0); ?>
    <?php append_control('sms-offpeak-monthly', 'Offpeak SMS Monthly', 'x', 0); ?>
   </div>
  </div>
  <div class="row">
   <div class="span4 columns">
    <strong>Which networks do you call?</strong>
    <p>Some networks give you discounts for calling others on the same network</p>
   </div>
   <div class="span6 columns">
    <?php append_control('percent-8ta', '8ta', '%', 25); ?>
    <?php append_control('percent-cellc', 'Cell C', '%', 25); ?>
   </div>
   <div class="span6 columns">
    <?php append_control('percent-mtn', 'MTN', '%', 25); ?>
    <?php append_control('percent-cellc', 'Vodacom', '%', 25); ?>
   </div>
  </div>
  <div class="row">
   <div class="span4 columns">
    <strong>How much data do you need?</strong>
    <p>If you use different amounts each month, first enter the average amount then lock the package</p>
   </div>
   <div class="span6 columns">
    <?php append_control('bandwidth', 'Bandwidth', 'mb', 0); ?>
   </div>
  </div>
  <div class="row">
   <div class="span4 columns">
    <strong>Want to know your best option?</strong>
    <p>We'll work out how much each package will cost you with the extra's you'll need, and show it below.</p>
   </div>
   <div class="span6 columns">
    <div class="actions">
     <button id="calculate" class="btn primary" type="submit">Find cheapest contract</button>
    </div>
   </div>
  </div>
 </section>
</div>
<div style="padding: 20px">
 <section id="results">
  <div class="page-header">
   <h1>Package Options</h1>
    <p>Click on columns to sort the table, or hover over package names to see a breakdown of fees paid.</p>
  </div>
  <table class="zebra-striped">
   <thead>
   </thead>
   <tbody id="rows">
   </tbody>
  </table>
</div>

</body>
</html>
