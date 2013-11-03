<?php

abstract class Core_Model_Abstract {

    /**
     * @var Zend_Controller_Front
     */
    protected $front;

    public function __construct(Zend_Controller_Front $front) {
        $this->front = $front;
    }
}