<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package rf-gutenberg-blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function rf_blocks_assets() {
	wp_enqueue_style(
		'accordion-css',
		plugins_url( 'build/index.css', dirname( __FILE__ ) ),
		array( 'wp-editor' )

    );
    
	wp_enqueue_script(
		'rf-block-accordion-js', // Handle.
		plugins_url( 'build/index.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' )
	);
	wp_enqueue_style(
		'rf-block-accordion-css', // Handle.
		plugins_url( 'build/style-index.css', dirname( __FILE__ ) ), 
		array( 'wp-edit-blocks' ) 
	);
	
	if ( has_block( 'rf-blocks-library/accordion' ) ) {
        wp_enqueue_script(
            'accordion-frontend-js',
           plugins_url('src/blocks/accordion/assets/accordion.js', dirname( __FILE__ ) ),
            array(),
            '1.0.0',
            true
		);
		wp_enqueue_style(
			'accordion-frontend-css',
			plugins_url( 'build/style-index.css', dirname( __FILE__ ) )
		);
    }
    
} 
add_action( 'enqueue_block_assets', 'rf_blocks_assets' );