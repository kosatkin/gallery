<?php

class Board_Bootstrap extends Zend_Application_Module_Bootstrap
{
    public function _initNamespace() {
        Zend_Loader_Autoloader::getInstance()->registerNamespace('Board_');
    }
}