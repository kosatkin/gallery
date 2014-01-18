<?php

abstract class Core_Model_Abstract {

    /**
     * @var Zend_Config
     */
    protected $config;

    public function __construct() {
        $this->config = Zend_Registry::get('config');
    }
}