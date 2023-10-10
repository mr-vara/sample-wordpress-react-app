<?php
/**
 * Plugin Name:       Tasks
 * Description:       A Tasks platform made by WordPress.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Vara
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       tasks
 */

 add_action( 'admin_menu', 'tasks_init_menu' );

/**
 * Init Admin Menu.
 *
 * @return void
 */
function tasks_init_menu() {
    add_menu_page( __( 'Tasks', 'tasks'), __( 'Tasks', 'tasks'), 'manage_options', 'tasks', 'tasks_admin_page', 'dashicons-admin-post', '2.1' );
}

/**
 * Init Admin Page.
 *
 * @return void
 */
function tasks_admin_page() {
    require_once plugin_dir_path( __FILE__ ) . 'templates/app.php';
}

add_action( 'admin_enqueue_scripts', 'tasks_admin_enqueue_scripts' );

/**
 * Enqueue scripts and styles.
 *
 * @return void
 */
function tasks_admin_enqueue_scripts() {
    wp_enqueue_style( 'tasks-style', plugin_dir_url( __FILE__ ) . 'build/index.css' );
    wp_enqueue_script( 'tasks-script', plugin_dir_url( __FILE__ ) . 'build/index.js', array( 'wp-element' ), '1.0.0', true );
}

function create_tasks_table() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'tasks_data';

    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

register_activation_hook(__FILE__, 'create_tasks_table');

function register_tasks_api_endpoints() {
    register_rest_route('tasks/v1', 'insert-data', array(
        'methods' => 'POST',
        'callback' => 'insert_data_callback',
    ));

    register_rest_route('tasks/v1', 'get-data', array(
        'methods' => 'GET',
        'callback' => 'get_data_callback',
    ));
}

add_action('rest_api_init', 'register_tasks_api_endpoints');

function insert_data_callback($request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'tasks_data';

    $data = $request->get_json_params();

    $wpdb->insert($table_name, array(
        'title' => $data['title'],
        'description' => $data['description'],
    ));

    return rest_ensure_response(array('message' => 'Data inserted successfully.'));
}

function get_data_callback() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'tasks_data';

    $results = $wpdb->get_results("SELECT * FROM $table_name", ARRAY_A);

    return rest_ensure_response($results);
}


