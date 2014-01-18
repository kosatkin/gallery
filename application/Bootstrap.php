<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
    protected function _initDoctype() {
        $this->bootstrap('view');
        $view = $this->getResource('view');
        $view->doctype('HTML5');
    }

    protected function _initView() {
        $view = new Zend_View();
        return $view;
    }

    protected function _initCore() {
        Zend_Loader_Autoloader::getInstance()->registerNamespace('Core');
    }

    protected function _initConfig() {
        $config = new Zend_Config($this->getOptions(), true);
        Zend_Registry::set('config', $config->toArray());
        return $config;
    }
}
