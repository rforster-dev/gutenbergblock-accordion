<?php

/**
 * Plugin Name: RF Blocks library
 * Plugin URI: 
 * Description: A collection blocks for Gutenberg editor
 * Version: 1.0.0
 * Author: Russell Forster
 *
 * @package rf-blocks-library
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';