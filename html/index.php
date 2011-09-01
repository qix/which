<?php 
chdir(__DIR__.'/..');

require_once('ext/free/common.php');

/**
 * $display = explode('/', substr(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), 1));
 */

require 'code/index.php';
